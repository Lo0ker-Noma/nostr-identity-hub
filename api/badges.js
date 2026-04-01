/**
 * Badge Issuance & Verification API
 * Implements NIP-58 badge system for reputation tracking
 *
 * Badge Types:
 * - attendance: Proof of attendance at events (from POA-HDMP)
 * - speaker: Given a talk or workshop
 * - contributor: Built something for the community
 * - donor: Supported via Lightning zaps (NIP-57)
 * - verified: Identity confirmed via NIP-05
 * - core: Long-term contributor with multiple badges
 *
 * Endpoints:
 * GET  /api/badges?pubkey=<hex> - Get all badges for a pubkey
 * POST /api/badges - Issue a new badge (admin only)
 */

import { getPublicKey, finalizeEvent } from 'nostr-tools/pure';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';

const BADGE_TYPES = {
  attendance: { name: 'Event Attendee', description: 'Attended a La Crypta event', image: '' },
  speaker: { name: 'Speaker', description: 'Hosted a talk or workshop', image: '' },
  contributor: { name: 'Contributor', description: 'Built for the community', image: '' },
  donor: { name: 'Donor', description: 'Supported La Crypta via Lightning', image: '' },
  verified: { name: 'Verified Member', description: 'NIP-05 verified identity', image: '' },
  core: { name: 'Core Member', description: 'Long-term active contributor', image: '' },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return getBadges(req, res);
  }

  if (req.method === 'POST') {
    return issueBadge(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function getBadges(req, res) {
  const { pubkey } = req.query;

  if (!pubkey || !/^[0-9a-f]{64}$/.test(pubkey)) {
    return res.status(400).json({ error: 'Valid hex pubkey required' });
  }

  // TODO: Query Nostr relays for NIP-58 badge events (kind 8 award events)
  // For MVP, return placeholder data
  return res.status(200).json({
    pubkey,
    badges: [],
    reputation: 0,
    message: 'Badge system connecting to Nostr relays...',
  });
}

async function issueBadge(req, res) {
  const { recipientPubkey, badgeType, eventId, adminKey } = req.body || {};

  // Verify admin authorization
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!recipientPubkey || !/^[0-9a-f]{64}$/.test(recipientPubkey)) {
    return res.status(400).json({ error: 'Valid recipient hex pubkey required' });
  }

  if (!badgeType || !BADGE_TYPES[badgeType]) {
    return res.status(400).json({
      error: 'Invalid badge type',
      validTypes: Object.keys(BADGE_TYPES),
    });
  }

  const badge = BADGE_TYPES[badgeType];

  // TODO: Create NIP-58 badge definition (kind 30009) and award (kind 8)
  // using server-side Schnorr signing like we did in POA-HDMP
  return res.status(200).json({
    success: true,
    message: `Badge "${badge.name}" queued for issuance to ${recipientPubkey.slice(0, 12)}...`,
    badgeType,
    recipient: recipientPubkey,
  });
}
