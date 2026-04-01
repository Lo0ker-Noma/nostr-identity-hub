# Nostr Identity Hub

Verifiable profiles & reputation badges for the La Crypta community, built on Nostr open protocols.

## The Problem

Community members get impersonated. Someone changes their name slightly, pretends to be a trusted member, and scams newcomers. There's no way for new members to verify who's legit and who's a come empanadas.

## The Solution

A Nostr-native identity system that combines NIP-05 verification with NIP-58 reputation badges:

- **NIP-05 Identity**: `username@lacrypta.ar` — DNS-verified Nostr pubkey
- **NIP-58 Badges**: Attendance, Speaker, Contributor, Donor, Verified, Core Member
- **NIP-57 Zaps**: Lightning payment verification for donation badges
- **Reputation Score**: Weighted scoring based on accumulated badges and activity

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (La Crypta design system)
- Backend: Vercel Serverless Functions (Node.js)
- Protocol: Nostr (NIP-05, NIP-58, NIP-57)
- Crypto: BIP-340 Schnorr signatures for server-side event signing
- Payments: Lightning Network via NWC (NIP-47)

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/.well-known/nostr.json` | GET | NIP-05 identity resolution |
| `/api/badges` | GET | Get badges for a pubkey |
| `/api/badges` | POST | Issue badge (admin) |
| `/api/verify` | GET | Full member verification |

## Development

```bash
npm install
npm run dev
```

## Hackathon

Built for La Crypta Hackathon Abril 2026 — Theme: Nostr Identity & Social

Evolution of POA-HDMP (Proof of Attendance) system.

## License

MIT
