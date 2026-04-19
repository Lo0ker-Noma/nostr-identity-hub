/**
 * NIP-98 HTTP Auth verification.
 * https://github.com/nostr-protocol/nips/blob/master/98.md
 *
 * Client sends:  Authorization: Nostr <base64(event_json)>
 * Event shape:
 *   kind: 27235
 *   tags: [["u","<abs url>"], ["method","POST"], ["payload","<sha256 hex of body>"]]
 *   created_at: unix seconds (within ±60s of server clock)
 *
 * On success returns { ok: true, pubkey }. On failure returns { ok: false, error, status }.
 */

import { verifyEvent } from 'nostr-tools/pure';
import crypto from 'crypto';

const MAX_CLOCK_SKEW_SEC = 60;
const REQUIRED_KIND = 27235;

function b64decode(str) {
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch {
    return null;
  }
}

function tagValue(tags, name) {
  const t = (tags || []).find(t => Array.isArray(t) && t[0] === name);
  return t ? t[1] : null;
}

export function sha256Hex(s) {
  return crypto.createHash('sha256').update(s, 'utf-8').digest('hex');
}

/**
 * Verify a NIP-98 header and bind it to a request.
 * @param {object} opts
 * @param {string} opts.authHeader - raw Authorization header value
 * @param {string} opts.method - HTTP method, e.g. "POST"
 * @param {string} opts.url - absolute URL the client supposedly hit
 * @param {string} [opts.rawBody] - exact body string, if any (used for payload hash)
 */
export function verifyNip98({ authHeader, method, url, rawBody }) {
  if (!authHeader || typeof authHeader !== 'string') {
    return { ok: false, status: 401, error: 'Missing Authorization header' };
  }

  const parts = authHeader.trim().split(/\s+/);
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'nostr') {
    return { ok: false, status: 401, error: 'Authorization scheme must be "Nostr"' };
  }

  const json = b64decode(parts[1]);
  if (!json) return { ok: false, status: 401, error: 'Authorization payload is not base64' };

  let evt;
  try { evt = JSON.parse(json); } catch {
    return { ok: false, status: 401, error: 'Authorization payload is not JSON' };
  }

  if (!evt || typeof evt !== 'object') {
    return { ok: false, status: 401, error: 'Malformed auth event' };
  }

  if (evt.kind !== REQUIRED_KIND) {
    return { ok: false, status: 401, error: `Auth event must be kind ${REQUIRED_KIND}` };
  }

  const now = Math.floor(Date.now() / 1000);
  if (typeof evt.created_at !== 'number' || Math.abs(now - evt.created_at) > MAX_CLOCK_SKEW_SEC) {
    return { ok: false, status: 401, error: 'Auth event expired or too far in the future' };
  }

  const evtUrl = tagValue(evt.tags, 'u');
  const evtMethod = tagValue(evt.tags, 'method');
  if (!evtUrl || !evtMethod) {
    return { ok: false, status: 401, error: 'Auth event missing "u" or "method" tag' };
  }
  if (evtMethod.toUpperCase() !== method.toUpperCase()) {
    return { ok: false, status: 401, error: 'Auth method mismatch' };
  }
  if (!urlMatches(evtUrl, url)) {
    return { ok: false, status: 401, error: 'Auth URL mismatch' };
  }

  if (rawBody && rawBody.length > 0) {
    const evtPayload = tagValue(evt.tags, 'payload');
    if (!evtPayload) {
      return { ok: false, status: 401, error: 'Auth event missing "payload" tag for non-empty body' };
    }
    const expected = sha256Hex(rawBody);
    if (evtPayload.toLowerCase() !== expected) {
      return { ok: false, status: 401, error: 'Body hash does not match auth payload' };
    }
  }

  let valid = false;
  try { valid = verifyEvent(evt); } catch { valid = false; }
  if (!valid) {
    return { ok: false, status: 401, error: 'Invalid signature on auth event' };
  }

  return { ok: true, pubkey: evt.pubkey };
}

/**
 * We allow the event's "u" tag to match either the request's full URL or
 * the request URL with a different origin (helps behind Vercel's proxy,
 * previews, and custom domains). We compare path + query strictly and
 * accept any host.
 */
function urlMatches(a, b) {
  try {
    const ua = new URL(a);
    const ub = new URL(b);
    return ua.pathname === ub.pathname && ua.search === ub.search;
  } catch {
    return a === b;
  }
}
