# 🎟️ EventX – On‑chain NFT Ticketing on Somnia

## 🌍 Overview

EventX is a fully on‑chain event ticketing platform that issues tickets as NFTs on the Somnia Testnet. It enables secure, transparent, and easily transferable ticket ownership, eliminating fraud and scalping. Organizers can create events; attendees can register, mint ticket NFTs, and verify them via QR.

## ✨ Key Features

### 🎟️ Decentralized Ticket Minting & Transfer
- ERC‑721 tickets per seat with on‑chain ownership and transfers.
- Live parsing of the ERC‑721 `Transfer` event to display minted Token ID after purchase.

### 🤖 AI Assistant (in‑app helper)
- Context‑aware guidance for connect wallet, event creation, purchasing, and verification.
- Floating UI available across pages.

### 📲 QR Code Verification
- Each ticket exposes a verification link and QR.
- `/verify?tokenId=...&eventId=...` checks `ownerOf(tokenId)` and `getTicketDetails(tokenId)` on‑chain.

### 🔐 Secure Blockchain Transactions
- Powered by Somnia Testnet, enabling fast, transparent, and low‑cost mints and transfers.
- Immutable on‑chain provenance and Transfer logs.

### 🖼️ Event Flyers via IPFS/Pinata
- Organizers upload an event image when creating an event.
- If Web3.Storage is available, uploads go to Web3.Storage; otherwise a secure Next.js API route uploads to Pinata (server‑side JWT).
- Flyers are displayed on event cards, the event details page, and shared via a decentralized metadata JSON pinned to IPFS.

### 🧭 Shareable Event Page with QR
- `/event/[id]?metaCid=<cid>` displays the flyer (loaded from IPFS JSON) and event info from chain.
- Page includes a shareable link and a QR image for easy distribution.

### ✅ UX Polishing
- Past dates/times are disallowed when creating events; expired events are clearly marked and cannot be registered.
- Toast notifications for success and error states (create event, purchase, uploads).

### 🔄 Resale Marketplace
A decentralized marketplace for verified ticket resale, maintaining ticket integrity and fair pricing. Automated smart contracts prevent scalping and fraud while ensuring legitimate secondary market transactions.

## 🛠️ Tech Stack

### Languages & Frameworks
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Blockchain
Somnia Testnet (Gelato RPC)

Contracts: Solidity (ERC‑721 Ticket), optional ERC‑1155 collectibles (roadmap)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system:

```bash
node --version
npm --version
```

### Installation (Frontend)

1) Clone and open the repo
```bash
git clone https://github.com/Lynndabel/Evvnt.git
cd EventX/fe
```

2) Install and run
```bash
npm install
npm run dev
```

3) Open the app
```
http://localhost:3000
```

### Installation (Contracts)
Contracts are in `smart-contract/`. Deploy to Somnia Testnet, then set the address in the frontend env.

## ⚙️ Configuration

Create `fe/.env.local` with:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x9c8447b583dc5ff7a25289ca1f7dd6637ff81955
NEXT_PUBLIC_RPC_URL=https://rpc-somnia-testnet.gelato.digital

# Optional: use Web3.Storage first, falls back to Pinata if not set or down
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=...

# Required for Pinata uploads (server-side only)
PINATA_JWT=eyJhbGciOi...
```

Notes:
- If Web3.Storage is unavailable (maintenance), uploads automatically fall back to Pinata via `/api/ipfs`.
- Pinata JWT must include scopes for `pinFileToIPFS` and `pinJSONToIPFS`.

## 📈 Platform Features

### 🌐 Landing Page
A modern, responsive landing page that showcases the platform's capabilities and allows users to join the waitlist for early access.

<img width="945" alt="Landing Page" src="https://github.com/user-attachments/assets/36aff1b1-6c2f-476d-b0ea-8729c0a52148" />

### 🎟️ Event Management
- Create events with title, date/time, location, max tickets, and optional max resale price.
- Upload a flyer image (IPFS). Past date/time is blocked.

<img width="948" alt="Event Management" src="https://github.com/user-attachments/assets/786b0fb1-92c5-4433-89bd-6c7282ea8e69" />

### 🏪 Ticket Purchasing
- Browse events, see availability and pricing, register by selecting a seat.
- On success, a ticket NFT is minted and the Token ID is shown.

<img width="950" alt="Ticket Collection" src="https://github.com/user-attachments/assets/cd58022e-d42d-4327-b3f6-ec45d496d4d8" />

### 💳 Ticket Sales Interface
Streamlined ticket purchasing experience with blockchain integration.

<img width="960" alt="Ticket Sales" src="https://github.com/user-attachments/assets/a222522c-71fc-47df-b6f0-a775ed58cd11" />

### 🔨 NFT Ticket Minting
- ERC‑721 ticket per seat. Organizer availability updates on purchase.

<img width="959" alt="Ticket Minting" src="https://github.com/user-attachments/assets/f773d40b-760f-4021-aaf0-0ea4d87e677e" />

### 📱 QR Verification
- My Tickets page shows a QR per ticket and a copyable verification link.
- `/verify` page checks validity on‑chain and displays seat and owner.

### 👤 Organizer Dashboard
- View events you created, including tickets sold and a live “View Registrations” table (owner, seat, tokenId).

### 🖼️ Event Details & Sharing
- `/event/[id]` shows flyer, info, and includes a QR share code.

<img width="947" alt="QR Code Integration" src="https://github.com/user-attachments/assets/99520049-8a10-4ae3-b538-2e6b0bc5df7b" />

## 🔵 Somnia Integration

### Why Base?

**⚡ Speed & Efficiency**
Fast confirmation on Somnia Testnet (via Gelato RPC).

**💰 Cost Efficiency**
Minimal transaction fees make the platform accessible to users while keeping operational costs low for event organizers.

**🔒 Security**
Built on Ethereum's robust security model with the added benefits of Layer 2 scaling solutions.

## 🌐 Share & Demo

- Shareable Event Page: `/event/{id}?metaCid=<cid>`
- Verification Page: `/verify?tokenId=...&eventId=...`

## 🧪 How to Use

1) Connect wallet on the home page.
2) Create an event (choose a future date/time). Optionally upload a flyer.
3) Share the event link from the success toast. The link includes `metaCid` so others see the flyer.
4) Attendees open the link or the app, pick a seat, and register.
5) After purchase, they see the minted Token ID and can view it in My Tickets.
6) At entry, scan the ticket’s QR to verify on `/verify`.

## 🧰 Troubleshooting

- Web3.Storage 503 maintenance: uploads automatically fall back to Pinata (ensure `PINATA_JWT` is set with proper scopes).
- Pinata 403 NO_SCOPES_FOUND: recreate JWT with `pinFileToIPFS` and `pinJSONToIPFS` scopes.
- Browser storage errors (FILE_ERROR_NO_SPACE): free local disk space or clear site data (DevTools → Application → Clear storage).

## 🗺️ Roadmap

- ERC‑1155 Event Collectibles (one tokenId per event, optional ticket‑holder gating).
- On‑chain resale function with enforced `maxResalePrice` and marketplace integration.
- Live event indexing via a custom `TicketPurchased` event for faster reads.
- Attendee-facing toast links to Somnia explorer and improved activity history.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and submit pull requests for any improvements.

## 📞 Support

For support or questions, please reach out to our team or create an issue in this repository.