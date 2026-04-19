/**
 * NIP-05 Registration Endpoint (hardened)
 *
 * POST /api/register
 *   Authorization: Nostr <base64(kind-27235 event)>    -- NIP-98 HTTP Auth
 *   Content-Type: application/json
 *   Body: { name: "satoshi", pubkey: "<hex>", displayName: "Satoshi Nakamoto" }
 *
 * Enforcement:
 *   1. Content-Type must be application/json
 *   2. Valid NIP-98 signature, signed by the same pubkey being registered
 *   3. name matches strict regex, not on the reserved list
 *   4. pubkey is 64-char lowercase hex
 *   5. displayName ≤ 64 chars after trim
 *   6. Per-IP rate limit (10 req / 10 min) + per-pubkey limit (3 names / hour)
 *   7. If name already exists and belongs to a different pubkey → 409
 */

import { getByName, register } from './_store.js';
import { verifyNip98 } from './_auth.js';
import { hit, clientIp } from './_ratelimit.js';

// Strict: starts and ends with alphanumeric, allows - _ . in the middle
const NAME_RE = /^[a-z0-9](?:[a-z0-9_\-.]{0,30}[a-z0-9])?$/;
const HEX_RE = /^[0-9a-f]{64}$/;
const MAX_DISPLAY_NAME = 64;
const MAX_BODY_BYTES = 2048;

const RESERVED = new Set([
  'admin', 'administrator', 'root', 'support', 'help', 'info',
  'nostr', 'lacrypta', 'lacryptaar', 'la_crypta', 'la-crypta',
  'system', 'sys', 'mod', 'moderator', 'staff', 'owner',
  'abuse', 'security', 'postmaster', 'webmaster', 'hostmaster',
  'api', 'www', 'mail', 'email', 'null', 'undefined', 'bot',
  'satoshi', // keep the founder's handle reserved; requires future manual grant
  '_nostr', '.well-known',
]);

function setSecurityHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
}

function getAbsoluteUrl(req) {
  // Vercel sets x-forwarded-proto and x-forwarded-host
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  return `${proto}://${host}${req.url}`;
}

async function readRawBody(req) {
  // Vercel's Node runtime pre-parses JSON into req.body; we need the raw
  // string for the NIP-98 payload hash. Re-serialize deterministically.
  if (req.body && typeof req.body === 'object') {
    return JSON.stringify(req.body);
  }
  if (typeof req.body === 'string') return req.body;

  // Fallback: stream
  return new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf-8');
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > MAX_BODY_BYTES) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Content-Type guard (prevents form-encoded CSRF with simple requests)
  const ct = (req.headers['content-type'] || '').toLowerCase();
  if (!ct.startsWith('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  // Per-IP rate limit
  const ip = clientIp(req);
  const ipLimit = hit(`ip:${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 });
  if (!ipLimit.allowed) {
    res.setHeader('Retry-After', Math.ceil(ipLimit.retryAfterMs / 1000));
    return res.status(429).json({ error: 'Too many requests from this IP' });
  }

  // Read raw body for both parsing and payload hashing
  let raw;
  try { raw = await readRawBody(req); }
  catch (e) { return res.status(413).json({ error: 'Body too large' }); }

  if (raw && raw.length > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Body too large' });
  }

  let body = {};
  try { body = raw ? JSON.parse(raw) : {}; }
  catch { return res.status(400).json({ error: 'Invalid JSON body' }); }

  const name = String(body.name || '').trim().toLowerCase();
  const pubkey = String(body.pubkey || '').trim().toLowerCase();
  const displayName = String(body.displayName || '').trim();

  if (!NAME_RE.test(name)) {
    return res.status(400).json({
      error: 'Invalid name. 2-32 chars, alphanumeric with _ - . in the middle.',
    });
  }
  if (RESERVED.has(name)) {
    return res.status(403).json({ error: `"${name}" is a reserved name` });
  }
  if (!HEX_RE.test(pubkey)) {
    return res.status(400).json({ error: 'Invalid pubkey. Must be 64-char lowercase hex.' });
  }
  if (!displayName || displayName.length > MAX_DISPLAY_NAME) {
    return res.status(400).json({
      error: `displayName must be 1-${MAX_DISPLAY_NAME} characters`,
    });
  }

  // NIP-98: caller must prove control of `pubkey`
  const auth = verifyNip98({
    authHeader: req.headers.authorization,
    method: 'POST',
    url: getAbsoluteUrl(req),
    rawBody: raw,
  });
  if (!auth.ok) {
    return res.status(auth.status || 401).json({ error: auth.error });
  }
  if (auth.pubkey !== pubkey) {
    return res.status(403).json({
      error: 'Authorization pubkey does not match body.pubkey',
    });
  }

  // Per-pubkey rate limit (3 successful registrations per hour max)
  const pkLimit = hit(`pk:${pubkey}`, { limit: 3, windowMs: 60 * 60 * 1000 });
  if (!pkLimit.allowed) {
    res.setHeader('Retry-After', Math.ceil(pkLimit.retryAfterMs / 1000));
    return res.status(429).json({ error: 'Too many registrations for this pubkey' });
  }

  // Idempotent if same (name,pubkey). 409 only on true collision.
  const existing = getByName(name);
  if (existing && existing.pubkey !== pubkey) {
    return res.status(409).json({
      error: `Name "${name}" is already registered by another pubkey`,
    });
  }

  const entry = register({ name, pubkey, displayName });

  return res.status(200).json({
    success: true,
    registered: {
      name: entry.name,
      nip05: `${name}@lacrypta.ar`,
      pubkey: entry.pubkey,
      createdAt: entry.createdAt,
    },
    wellKnown: `/.well-known/nostr.json?name=${name}`,
  });
}
