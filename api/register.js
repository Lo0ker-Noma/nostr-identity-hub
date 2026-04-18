/**
 * NIP-05 Registration Endpoint
 *
 * POST /api/register
 * Body: { name: "satoshi", pubkey: "<hex>", displayName: "Satoshi Nakamoto" }
 *
 * Registers a name → pubkey mapping so that `name@lacrypta.ar` resolves
 * via /.well-known/nostr.json (served by /api/nip05).
 *
 * For MVP there's no auth; in production require a signed NIP-98 challenge
 * proving the user controls the pubkey before registering.
 */

import { getByName, register } from './_store.js';

const NAME_RE = /^[a-z0-9_\-.]{2,32}$/;
const HEX_RE = /^[0-9a-f]{64}$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse body (Vercel auto-parses JSON but be defensive)
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const name = (body.name || '').trim().toLowerCase();
  const pubkey = (body.pubkey || '').trim().toLowerCase();
  const displayName = (body.displayName || '').trim();

  if (!NAME_RE.test(name)) {
    return res.status(400).json({
      error: 'Invalid name. Use 2-32 chars: a-z, 0-9, _, -, .',
    });
  }

  if (!HEX_RE.test(pubkey)) {
    return res.status(400).json({
      error: 'Invalid pubkey. Must be 64-char lowercase hex.',
    });
  }

  // Check for name collision
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
