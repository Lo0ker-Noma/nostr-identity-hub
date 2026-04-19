/**
 * Tiny in-memory sliding-window rate limiter.
 * Per-instance only (no cross-region sync). For production, swap for Upstash.
 */

const buckets = new Map(); // key -> [timestamps]

export function hit(key, { limit, windowMs }) {
  const now = Date.now();
  const arr = (buckets.get(key) || []).filter(t => now - t < windowMs);
  arr.push(now);
  buckets.set(key, arr);

  // Opportunistic prune to keep the map small
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      const fresh = v.filter(t => now - t < windowMs);
      if (!fresh.length) buckets.delete(k);
      else buckets.set(k, fresh);
    }
  }

  return {
    allowed: arr.length <= limit,
    count: arr.length,
    limit,
    retryAfterMs: arr.length > limit ? windowMs - (now - arr[0]) : 0,
  };
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}
