/**
 * Simple shared store for NIP-05 registrations.
 *
 * NOTE: Vercel serverless functions are stateless. We persist to /tmp
 * (best-effort, survives within a warm instance) AND keep a module-level
 * cache. For production, swap this for Vercel KV / Upstash Redis / a real DB.
 *
 * Shape on disk:
 * {
 *   "satoshi": { pubkey: "<hex>", name: "Satoshi", nip05: "satoshi", createdAt: 1713... },
 *   ...
 * }
 */

import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join('/tmp', 'nip05-registrations.json');

// Module-level cache — keeps data hot across invocations on same instance
let cache = null;

function loadFromDisk() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[store] load error:', err.message);
  }
  return {};
}

function saveToDisk(data) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[store] save error:', err.message);
  }
}

export function getAll() {
  if (cache === null) cache = loadFromDisk();
  return cache;
}

export function getByName(name) {
  const all = getAll();
  return all[name.toLowerCase()] || null;
}

export function register({ name, pubkey, displayName }) {
  const all = getAll();
  const key = name.toLowerCase();
  all[key] = {
    pubkey,
    name: displayName || name,
    nip05: key,
    createdAt: Date.now(),
  };
  cache = all;
  saveToDisk(all);
  return all[key];
}

export function listVerified() {
  const all = getAll();
  return Object.entries(all).map(([name, data]) => ({
    name,
    ...data,
  }));
}
