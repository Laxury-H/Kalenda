# Core Features Implementation

## Overview
This document describes the implementation of the core features for the Kalenda application, including user authentication via Solana wallet, NFT minting, marketplace functionality, and escrow system.

## 1. User Authentication via Solana Wallet

### Implementation Details
- Users authenticate using their Solana wallet (Phantom, Solflare, etc.)
- Wallet signature verification ensures authenticity
- User profiles are created automatically upon first login
- Session management uses JWT tokens

### Flow
1. User connects wallet via frontend
2. Frontend requests challenge from backend
3. Backend generates challenge and signs with private key
4. Frontend signs challenge with wallet and sends back
5. Backend verifies signature and creates/authenticates user
6. Backend returns JWT token for session management

### Security Considerations
- Challenge-response mechanism prevents replay attacks
- Wallet signatures are verified using Solana's cryptographic functions
- JWT tokens are short-lived and refreshed as needed

## 2. NFT Minting

### Implementation Details
- Time slots are minted as NFTs using Metaplex standard
- Each NFT contains metadata about the time slot (start/end time, creator, etc.)
- Minting is handled by the `kalenda-nft` smart contract
- Backend coordinates the minting process

### Process
1. Creator selects time slot in frontend
2. Frontend sends request to backend
3. Backend validates time slot and prepares metadata
4. Backend sends mint instruction to smart contract
5. User signs transaction in wallet
6. Transaction is submitted to Solana network
7. Backend updates database with NFT details

### Metadata Structure
```json
{
  "name": "1-hour consultation with Alex Johnson",
  "symbol": "KTS",
  "description": "60-minute consultation session",
  "startTime": 1678901234,
  "endTime": 1678904834,
  "creator": "5a4XqoEJc8K9N2P1Q7R3S6T4U8V5W7X9Y2Z1A3B4C5D6E7F8G9H1J2K3L4M5",
  "status": "available"
}
```

## 3. Marketplace Functionality

### Fixed Price Sales ("Buy Now")
- Creators set a fixed price for their time slots
- Buyers can purchase immediately at the listed price
- First-come, first-served basis
- Handled by `kalenda-marketplace` smart contract

### Auction System
- Creators set a starting price and auction duration
- Buyers place bids during the auction period
- Anti-sniping mechanism extends auction by 5 minutes if bid is placed in final 5 minutes
- Highest bidder wins when auction ends
- Handled by `kalenda-marketplace` smart contract

### Process Flow
1. Creator lists time slot (fixed price or auction)
2. Listing is stored on-chain and in backend database
3. Buyers discover listings through frontend
4. Buyers place purchases/bids through frontend
5. Transactions are processed by smart contracts
6. Backend updates database and sends notifications

## 4. Escrow System

### Implementation Details
- Funds are held in escrow until meeting completion or dispute resolution
- Automatic release after 24-hour meeting completion period
- Dispute resolution mechanism for conflicts
- Handled by `kalenda-escrow` smart contract

### Workflow
1. Buyer purchases time slot
2. Funds are transferred to escrow account
3. Buyer receives NFT as proof of purchase
4. Meeting takes place at scheduled time
5. 24-hour completion period begins after meeting end time
6. If no disputes, funds are automatically released to creator
7. If dispute, funds are held until resolution

### Dispute Resolution
1. Either party can open dispute during completion period
2. Dispute includes reason and evidence
3. Admin team reviews dispute (in initial implementation)
4. Admin decides in favor of buyer or seller
5. Funds are released according to resolution

## 5. Smart Contract Architecture

### kalenda-nft
- Handles NFT minting and metadata management
- Implements Metaplex standard for compatibility
- Manages time slot NFT lifecycle

### kalenda-marketplace
- Manages fixed price sales and auctions
- Implements anti-sniping mechanism
- Handles fund transfers for purchases

### kalenda-escrow
- Manages escrow accounts
- Implements automatic release mechanism
- Handles dispute resolution workflow

## 6. Backend Services

### Auth Service
- Wallet signature verification
- User session management
- JWT token generation

### Solana Service
- Blockchain interaction utilities
- Transaction signing and submission
- Balance queries and confirmations

### TimeSlot Service
- Time slot creation and management
- Listing and purchasing functionality
- Integration with smart contracts

### Bid Service
- Auction bid management
- Highest bid tracking
- Bid acceptance workflow

## 7. Frontend Integration

### Wallet Integration
- Phantom and Solflare wallet support
- Connection and disconnection handling
- Transaction signing prompts

### NFT Interaction
- Display of owned time slot NFTs
- Metadata rendering
- Transfer and management

### Marketplace UI
- Listing browsing and filtering
- Fixed price purchase flow
- Auction bidding interface
- Real-time bid updates

### Escrow Management
- Meeting completion confirmation
- Dispute initiation
- Status tracking

## 8. Security Considerations

### Smart Contract Security
- Audits by third-party security firms
- Input validation and sanitization
- Reentrancy protection
- Access control mechanisms

### Backend Security
- Rate limiting to prevent abuse
- Input validation and sanitization
- Secure JWT implementation
- Database access controls

### Frontend Security
- Secure wallet integration
- Prevention of XSS and CSRF attacks
- Secure storage of session data
- Content Security Policy implementation

## 9. Performance Optimization

### Caching
- Frequently accessed data cached in Redis
- NFT metadata caching
- User profile caching

### Database Optimization
- Proper indexing for query performance
- Connection pooling
- Query optimization

### Smart Contract Optimization
- Efficient data structures
- Minimal compute usage
- Gas optimization

## 10. Monitoring and Logging

### Error Tracking
- Comprehensive error logging
- User-facing error messages
- Internal error reporting

### Performance Monitoring
- API response time tracking
- Database query performance
- Smart contract interaction metrics

### Security Monitoring
- Suspicious activity detection
- Failed authentication attempts
- Unauthorized access attempts