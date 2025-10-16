# Kalenda Project Structure

## Overview
```
kalenda/
├── programs/              # Solana smart contracts (Rust + Anchor)
├── frontend/              # Next.js frontend application
├── backend/               # NestJS backend services
├── docs/                  # Documentation
├── package.json           # Root package.json for workspace scripts
└── README.md              # Project overview
```

## Programs Directory
Contains all Solana smart contracts:
- `kalenda-nft/` - NFT contract for minting time slots
- `kalenda-marketplace/` - Marketplace contract for buying/selling
- `kalenda-escrow/` - Escrow contract for secure transactions

## Frontend Directory
Next.js application with:
- Wallet integration (Phantom, Solflare)
- Creator profile pages
- Calendar scheduling interface
- Marketplace browsing
- Bidding room for auctions
- User dashboards

## Backend Directory
NestJS services for:
- User profile management
- Off-chain metadata storage
- Notification system
- Dispute resolution workflow
- Database interactions

## Docs Directory
Project documentation:
- Technical specifications
- API documentation
- Deployment guides
- User manuals