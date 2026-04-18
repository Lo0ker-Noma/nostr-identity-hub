/**
 * NIP-05 Identity Verification Endpoint
 * Serves /.well-known/nostr.json for Nostr identity resolution
 *
 * When a Nostr client resolves "user@lacrypta.ar", it queries:
 * https://lacrypta.ar/.well-known/nostr.json?name=user
 *
 * This endpoint returns the mapping: { "names": { "user": "<hex_pubkey>" } }
 *
 * Data source: the shared store (api/_store.js) populated via /api/register.
 */

import { getAll, getByName } from './_store.js';

const RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.nostr.band',
  'wss://nos.lol',
  'wss://relay.lacrypta.ar',
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name } = req.query;

  // No name → return full directory (helpful for the Directory view)
  if (!name) {
    const all = getAll();
    const names = {};
    const relays = {};
    for (const [n, data] of Object.entries(all)) {
      names[n] = data.pubkey;
      relays[data.pubkey] = RELAYS;
    }
    return res.status(200).json({ names, relays });
  }

  const entry = getByName(String(name));
  if (!entry) {
    return res.status(200).json({ names: {} });
  }

  return res.status(200).json({
    names: { [String(name).toLowerCase()]: entry.pubkey },
    relays: { [entry.pubkey]: RELAYS },
  });
}
