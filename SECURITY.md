# Security Policy

## Threat model

The Nostr Identity Hub is a public NIP-05 provider. The core trust guarantees it must offer:

1. **Authenticity** — the pubkey behind `name@lacrypta.ar` is controlled by the person who registered it. Nobody can squat identities.
2. **Integrity** — registered mappings cannot be modified by a third party.
3. **Availability** — the public directory and well-known endpoint stay online for Nostr clients.

## Controls in place

### Authentication (`POST /api/register`)

All write requests require a [NIP-98](https://github.com/nostr-protocol/nips/blob/master/98.md) HTTP-Auth header:

```
Authorization: Nostr <base64(kind-27235 event)>
```

Server enforces:

- `kind === 27235`
- `created_at` within ±60 seconds of server clock (replay window)
- `tags: ["u", <url>]` path+query matches the request
- `tags: ["method", "POST"]` matches the HTTP method
- `tags: ["payload", <sha256>]` matches the raw request body
- Schnorr signature valid (BIP-340)
- `event.pubkey === body.pubkey` (binds auth to identity)

### Rate limiting

- 10 requests per 10 minutes per IP (`x-forwarded-for`)
- 3 successful registrations per hour per pubkey

Both use an in-memory sliding-window counter. A regional fail-over scenario could degrade to per-instance limits — production should swap to Upstash Redis.

### Input validation

- `name` → `^[a-z0-9](?:[a-z0-9_\-.]{0,30}[a-z0-9])?$` (2–32 chars, alnum start/end)
- `pubkey` → `^[0-9a-f]{64}$` (lowercase hex only)
- `displayName` → 1–64 chars after trim
- Request body capped at 2048 bytes
- Content-Type must be `application/json`

### Reserved names

`admin`, `administrator`, `root`, `support`, `help`, `info`, `nostr`, `lacrypta`, `lacryptaar`, `la_crypta`, `la-crypta`, `system`, `sys`, `mod`, `moderator`, `staff`, `owner`, `abuse`, `security`, `postmaster`, `webmaster`, `hostmaster`, `api`, `www`, `mail`, `email`, `null`, `undefined`, `bot`, `satoshi`, `_nostr`, `.well-known`.

### HTTP headers (set in `vercel.json`)

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://esm.sh; …`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Cache-Control: no-store` on `/api/*`

### Admin endpoint

`POST /api/badges` uses `ADMIN_KEY` env var compared with `crypto.timingSafeEqual` to resist timing attacks.

### Supply chain

- `nostr-tools` pinned to exact version `2.7.2` (no caret range)
- `vite` pinned to exact `5.4.21`

## Known limitations (documented, not fixed)

- **CDN import** of `nostr-tools` from `esm.sh` for browser-side key generation. Pinned version reduces risk but a same-origin Vite bundle would fully close it. Planned follow-up.
- **Persistence in `/tmp`** — serverless instances are ephemeral. For production, move `_store.js` to Upstash Redis / Vercel KV.
- **Per-instance rate limiter** — multiple Vercel regions maintain independent counters. For a strict global limit, needs shared state.

## Pentest report

See [PENTEST.md](./PENTEST.md) for the full finding list and the 10-scenario attack suite (all blocked).

## Reporting vulnerabilities

Open a DM on Nostr to the project maintainer or a private GitHub security advisory.
