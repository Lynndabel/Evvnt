# EventX – Fully On‑Chain NFT Ticketing on Somnia

A fully on‑chain event ticketing platform where every ticket is a unique ERC‑721 NFT. Organizers create events. Attendees register and mint tickets. Ownership is transparent and transferable. QR verification makes entry instant and tamper‑proof.

- Network: Somnia Testnet (Gelato RPC)
- Ticket Standard: ERC‑721 (1 token = 1 seat)
- Frontend: Next.js (App Router), TypeScript, Tailwind
- Storage: IPFS (Web3.Storage if available, Pinata fallback via secure server route)
- Verification: On‑chain `ownerOf` + `getTicketDetails`

## Why EventX?
- Secure by design: tickets are NFTs on chain — no forgery, no duplicate entries.
- Transparent: provenance and transfers are publicly verifiable.
- Transferable: buyers can resell and transfer tickets under organizer rules.
- Usable: clean UX with seat selection, QR verification, and toasts.

---

## Architecture

```mermaid
flowchart LR
  U[You] --> A[EventX Website]
  A --> B[Somnia Network\n(create events, mint tickets)]
  A --> C[IPFS\n(store event flyer & metadata)]
  U -. share link or QR .-> Friends[Friends / Attendees]
  Friends --> A
  A --> D[/Verify Page/]
  D --> B
```

In plain words:
- You use the EventX website to create an event and upload a flyer.
- The flyer is saved on decentralized storage (IPFS).
- The event is created on the Somnia blockchain, and a share link + QR are generated.
- Attendees open the link, pick a seat, and mint a ticket (an NFT) on Somnia.
- At the venue, staff scan the ticket’s QR to instantly check on-chain if it’s valid.

- Reads go directly to Somnia (public RPC).
- Writes (mint, create) go on chain via wallet.
- Images are stored on IPFS; if Web3.Storage is down or not configured, we securely fallback to Pinata via a server-only secret.
- The Event Details page supports shareable links (with `metaCid`) and QR codes.

---

## Contract Addresses

- Ticket (ERC‑721): `0x9c8447b583dc5ff7a25289ca1f7dd6637ff81955` (Somnia Testnet)
  - Chain ID: 50312
  - RPC: https://dream-rpc.somnia.network

---

## Features

- Ticket NFTs
  - ERC‑721 per seat, immutable Transfer logs
  - Token ID revealed after purchase
- Seat selection and availability
  - Live availability from chain; UI updates on mint
- QR verification
  - My Tickets shows QR + verification link
  - `/verify?tokenId=...&eventId=...` checks on chain
- Event flyers (IPFS/Pinata)
  - Upload flyer in the Create Event modal
  - If Web3.Storage 503s, auto-fallback to Pinata (server route)
  - Flyer shared via pinned JSON metadata (`metaCid`)
- Shareable event page
  - `/event/[id]?metaCid=<cid>` shows flyer + details and provides a QR for sharing
- Organizer dashboard
  - Your events, tickets sold, and “View Registrations” (owner, seat, tokenId)
- Clean UX
  - Past dates/times blocked; expired events display “Event Ended” and are unregistrable
  - Toast notifications on success/error

---

## Quick Start

1) Clone and run the frontend
```bash
git clone https://github.com/Lynndabel/Evvnt.git
cd EventX/fe
npm install
npm run dev
# Open http://localhost:3000
```

2) Configure environment in `fe/.env.local`
```env
# Chain
NEXT_PUBLIC_CONTRACT_ADDRESS=0x9f2b8a544a647e66dea8ad4a202e84bef0819e17
NEXT_PUBLIC_CHAIN_ID=50312
NEXT_PUBLIC_RPC_URL=https://dream-rpc.somnia.network

# Optional: Web3.Storage (if you have it, uploads try this first)
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=YOUR_WEB3_STORAGE_TOKEN

# Required for Pinata (server-side, not public)
PINATA_JWT=YOUR_PINATA_JWT_WITH_pinFileToIPFS_and_pinJSONToIPFS_scopes
```

3) Contracts (optional to redeploy)
- Contracts live in `smart-contract/`
- Deploy to Somnia, then set `NEXT_PUBLIC_CONTRACT_ADDRESS`

4) Deployed dApp (Somnia Testnet)
- Live URL: https://<your-deployment-domain> (update this with your actual deployed link)
- Network: Somnia Testnet (Chain ID 50312)

5) Public Repository
- GitHub: https://github.com/Lynndabel/Evvnt (public, actively updated with multiple commits)

---

## How It Works

- Create event (Organizer)
  - Fill title, date/time (future only), price, max tickets, optional max resale price
  - Upload a flyer image → stored on IPFS
  - After success: we pin `{ eventId, imageUrl }` as JSON to IPFS and copy a share URL `/event/{id}?metaCid=<cid>` to your clipboard
- Share event
  - Send the share URL or the QR shown on the Event Details page
- Register (Attendee)
  - Choose seat, confirm transaction, mint ERC‑721 ticket
  - Token ID is shown in a toast after the transaction
- Verify at entry
  - Staff scan a ticket QR from My Tickets or open `/verify?tokenId=...&eventId=...`
  - The page reads on-chain and shows owner + seat, and whether the ticket is valid

---

## Key Pages

- `/` Home: Events listing and Organizer Dashboard
- `/my-tickets` Attendee tickets with QR and verification links
- `/verify` Live on-chain verification of a given ticket
- `/event/[id]` Flyer + details, share link, QR for distribution

---

## IPFS and Uploads

- Default path: Web3.Storage if `NEXT_PUBLIC_WEB3_STORAGE_TOKEN` is present
- Automatic fallback: Pinata via secure server route `/api/ipfs` (requires `PINATA_JWT` in server env)
- We pin small JSON metadata `{ eventId, imageUrl }` to allow everyone to see flyers cross-device

If you hit:
- Web3.Storage 503: We transparently fall back to Pinata
- Pinata 403 NO_SCOPES_FOUND: Recreate your JWT with `pinFileToIPFS` and `pinJSONToIPFS` scopes

---

## Anti-Fraud and Scalping

- Proof of ownership: `ownerOf(tokenId)` and Transfer logs
- Single seat per token: unique ERC‑721 seat mapping
- Roadmap: enforce resale via on-chain function honoring `maxResalePrice` and an official marketplace flow

---

## Screenshots (Placeholders)

- Ticket Collection
- Ticket Sales
- Ticket Minting
- QR Verification

You can embed your existing GitHub-hosted images here.

---

## Roadmap

- Event collectibles (ERC‑1155): per-event collectibles with ticket-holder gating
- On-chain resale function and marketplace integration
- Indexing with a dedicated `TicketPurchased` event for faster UI updates
- Explorer links in toasts for quick transaction view

---

## Troubleshooting

- Web3.Storage maintenance: uses Pinata automatically (ensure `PINATA_JWT` set)
- Disk/site storage errors (FILE_ERROR_NO_SPACE): free disk or clear site data in DevTools → Application → Clear storage
- Flyer not visible to others: share the `/event/[id]?metaCid=<cid>` link once; it caches the flyer mapping locally

---

## License

MIT — see `LICENSE`

---

## Contributing

PRs are welcome. Please open an issue to discuss large changes and provide steps to reproduce any bugs.

---

## Contact

Open an issue with a clear description and logs if you run into problems, or share feedback to improve the product.

