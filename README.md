# Nostr Identity Hub

Verifiable profiles & reputation badges for the La Crypta community, built on Nostr open protocols.

🔗 **Live demo:** https://nostr-identity-hub.vercel.app
🛡️ **Security report:** [PENTEST.md](./PENTEST.md) · [SECURITY.md](./SECURITY.md)

## The Problem

Community members get impersonated. Someone changes their name slightly, pretends to be a trusted member, and scams newcomers. There's no way for new members to verify who's legit and who's a come empanadas.

## The Solution

A Nostr-native identity system that combines NIP-05 verification with NIP-58 reputation badges:

- **NIP-05 Identity**: `username@lacrypta.ar` — DNS-verified Nostr pubkey
- **NIP-58 Badges**: Attendance, Speaker, Contributor, Donor, Verified, Core Member
- **NIP-57 Zaps**: Lightning payment verification for donation badges
- **Reputation Score**: Weighted scoring based on accumulated badges and activity

## Security highlights

This project went through a full pentest before submission. Every CRITICAL and HIGH finding was closed:

- **NIP-98 mandatory auth** on `POST /api/register` — caller must sign a kind-27235 event with the same pubkey they're registering. Eliminates identity hijacking.
- **Sliding-window rate limit** — 10 reqs/10min per IP, 3 registrations/hour per pubkey.
- **24 reserved names** (admin, root, lacrypta, satoshi…) cannot be claimed.
- **Strict input validation** — name regex, pubkey hex format, displayName ≤ 64 chars, body ≤ 2 KB.
- **Content-Type guard** — refuses anything other than `application/json`, killing form-encoded CSRF.
- **Security headers** — CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Timing-safe ADMIN_KEY** comparison.
- **Pinned crypto deps** (no auto-bump on `nostr-tools`).

10/10 attack scenarios blocked in the pentest test suite (full breakdown in [PENTEST.md](./PENTEST.md)).

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (La Crypta design system)
- Backend: Vercel Serverless Functions (Node.js, ESM)
- Protocol: Nostr (NIP-05, NIP-58, NIP-57, NIP-98)
- Crypto: BIP-340 Schnorr via `nostr-tools` (pinned 2.7.2)
- Payments: Lightning Network via NWC (NIP-47)

## API Endpoints

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/.well-known/nostr.json` | GET | none | NIP-05 identity resolution |
| `/api/register` | POST | **NIP-98** | Register a NIP-05 → pubkey mapping |
| `/api/badges` | GET | none | Get badges for a pubkey |
| `/api/badges` | POST | ADMIN_KEY | Issue badge |
| `/api/verify` | GET | none | Full member verification |

## Development

```bash
npm install
npm run dev      # vite dev at :3000
npm run build    # production bundle into dist/
```

## Hackathon

Built for **La Crypta Hackathon · April 2026** — Theme: Nostr Identity & Social.
Evolution of POA-HDMP (Proof of Attendance) system.

## License

MIT
