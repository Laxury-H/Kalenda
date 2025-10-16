# Smart Contract Setup Guide

## Prerequisites

1. Install Rust: https://www.rust-lang.org/tools/install
2. Install Solana CLI: https://docs.solana.com/cli/install-solana-cli-tools
3. Install Anchor CLI: https://book.anchor-lang.com/getting_started/installation.html

## Manual Project Structure

Since Anchor CLI might not be available, here's the manual structure for the smart contracts:

```
programs/
├── kalenda-nft/
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs
├── kalenda-marketplace/
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs
└── kalenda-escrow/
    ├── Cargo.toml
    └── src/
        └── lib.rs
```

## NFT Contract (kalenda-nft)

The NFT contract will handle minting time slots as NFTs using the Metaplex standard.

## Marketplace Contract (kalenda-marketplace)

The marketplace contract will handle:
- Fixed price sales ("Buy Now")
- Auction functionality with anti-sniping mechanism

## Escrow Contract (kalenda-escrow)

The escrow contract will handle secure fund transfers with:
- Automatic release after meeting period
- Dispute resolution mechanism

## Development Commands

After installing Anchor:

```bash
# Initialize the project
anchor init kalenda

# Build contracts
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```