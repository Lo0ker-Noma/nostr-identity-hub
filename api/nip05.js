/**
 * NIP-05 Identity Verification Endpoint
 * Serves /.well-known/nostr.json for Nostr identity resolution
 *
 * When a Nostr client resolves "user@lacrypta.ar", it queries:
 * https://lacrypta.ar/.well-known/nostr.json?name=user
 *
 * This endpoint returns the mapping: { "names": { "user": "<hex_pubkey>" } }
 */

// In production, this would be backed by a database
// For MVP, we use a static mapping that can be updated via the admin API
const VERIFIED_IDENTITIES = {
  // Format: "username": "hex_pubkey"
  // These will be populated via the /api/register endpoint
};

export default function handler(req, res) {
  // CORS headers for cross-origin NIP-05 resolution
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name } = req.query;

  if (!name) {
    // Return all verified names
    return res.status(200).json({
      names: VERIFIED_IDENTITIES,
    });
  }

  const pubkey = VERIFIED_IDENTITIES[name.toLowerCase()];

  if (!pubkey) {
    return res.status(200).json({
      names: {},
    });
  }

  return res.status(200).json({
    names: {
      [name.toLowerCase()]: pubkey,
    },
    relays: {
      [pubkey]: [
        'wss://relay.damus.io',
        'wss://relay.nostr.band',
        'wss://nos.lol',
        'wss://relay.lacrypta.ar',
      ],
    },
  });
}
