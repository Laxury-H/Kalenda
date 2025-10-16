# Deployment Guide

## Overview
This document provides instructions for deploying the Kalenda application to Solana Devnet and production environments.

## 1. Prerequisites

### System Requirements
1. **Operating System**: Linux, macOS, or Windows with WSL
2. **Node.js**: Version 16.x or higher
3. **Rust**: Latest stable version
4. **Solana CLI**: Version 1.14.x or higher
5. **Anchor CLI**: Version 0.28.x or higher
6. **PostgreSQL**: Version 13.x or higher
7. **Docker**: For containerized deployments (optional)

### Accounts and Keys
1. **Solana Wallet**: Phantom, Solflare, or other compatible wallet
2. **Solana Devnet Tokens**: Request from Solana faucet
3. **Vercel Account**: For frontend deployment
4. **Database Hosting**: Supabase, Heroku, or self-hosted PostgreSQL

## 2. Smart Contract Deployment

### Devnet Deployment
1. **Configure Solana CLI**
   ```bash
   solana config set --url devnet
   solana config set --keypair ~/.config/solana/id.json
   ```

2. **Request Devnet Tokens**
   ```bash
   solana airdrop 1
   ```

3. **Build and Deploy Contracts**
   ```bash
   cd programs
   anchor build
   anchor deploy --provider.cluster devnet
   ```

4. **Verify Deployment**
   ```bash
   solana program show <PROGRAM_ID>
   ```

### Mainnet Deployment
1. **Configure Solana CLI**
   ```bash
   solana config set --url mainnet-beta
   ```

2. **Fund Wallet**
   - Transfer SOL to your deployment wallet

3. **Deploy Contracts**
   ```bash
   cd programs
   anchor build
   anchor deploy --provider.cluster mainnet-beta
   ```

4. **Security Audit**
   - Run security audit tools before mainnet deployment
   - Consider third-party audit services

## 3. Backend Deployment

### Environment Setup
1. **Create Environment File**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure Environment Variables**
   ```env
   # Database Configuration
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   DB_NAME=kalenda

   # Solana Configuration
   SOLANA_NETWORK=devnet
   SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com

   # JWT Secret
   JWT_SECRET=your-jwt-secret
   ```

### Database Setup
1. **Run Migrations**
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

2. **Seed Database** (optional)
   ```bash
   npx prisma db seed
   ```

### Deployment Options

#### Vercel (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd backend
   vercel --prod
   ```

#### Docker Deployment
1. **Build Docker Image**
   ```bash
   cd backend
   docker build -t kalenda-backend .
   ```

2. **Run Container**
   ```bash
   docker run -p 3001:3001 kalenda-backend
   ```

#### Traditional Server Deployment
1. **Build Application**
   ```bash
   cd backend
   npm run build
   ```

2. **Start Server**
   ```bash
   npm run start:prod
   ```

## 4. Frontend Deployment

### Environment Setup
1. **Create Environment File**
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Configure Environment Variables**
   ```env
   # Solana Network
   NEXT_PUBLIC_SOLANA_NETWORK=devnet

   # Backend API URL
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

   # Program IDs (from contract deployment)
   NEXT_PUBLIC_NFT_PROGRAM_ID=your-nft-program-id
   NEXT_PUBLIC_MARKETPLACE_PROGRAM_ID=your-marketplace-program-id
   NEXT_PUBLIC_ESCROW_PROGRAM_ID=your-escrow-program-id
   ```

### Deployment to Vercel
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

### Custom Domain Setup
1. **Add Domain to Vercel**
   - Go to Vercel dashboard
   - Select your project
   - Navigate to Settings > Domains
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation

## 5. Monitoring and Maintenance

### Health Checks
1. **API Endpoints**
   - `/api/health` for backend health
   - Wallet connection status for frontend

2. **Database**
   - Connection pool monitoring
   - Query performance metrics

3. **Blockchain**
   - Transaction confirmation rates
   - RPC endpoint latency

### Logging
1. **Backend Logs**
   - Request/response logging
   - Error tracking
   - Performance metrics

2. **Frontend Logs**
   - User interaction tracking
   - Error reporting
   - Performance monitoring

### Backup Strategy
1. **Database Backups**
   - Daily automated backups
   - Point-in-time recovery
   - Cross-region replication

2. **Smart Contract State**
   - On-chain data is immutable
   - Off-chain metadata backups

## 6. Scaling Considerations

### Horizontal Scaling
1. **Backend Services**
   - Load balancer configuration
   - Stateless service design
   - Session management

2. **Database**
   - Read replicas for scaling reads
   - Connection pooling
   - Query optimization

### Caching Strategy
1. **Frontend Caching**
   - CDN for static assets
   - Browser caching headers
   - Service worker caching

2. **Backend Caching**
   - Redis for session storage
   - API response caching
   - Database query caching

### Database Optimization
1. **Indexing**
   - Frequently queried fields
   - Composite indexes for complex queries
   - Index maintenance

2. **Query Optimization**
   - Pagination for large datasets
   - Efficient joins
   - Avoiding N+1 queries

## 7. Security Best Practices

### Access Control
1. **API Security**
   - Rate limiting
   - Input validation
   - Authentication/authorization

2. **Database Security**
   - Least privilege principle
   - Encrypted connections
   - Regular security updates

### Wallet Security
1. **Transaction Signing**
   - User confirmation for all transactions
   - Clear transaction details
   - Gas estimation

2. **Private Key Management**
   - Client-side only storage
   - No server-side key storage
   - Secure wallet connections

### Data Protection
1. **Encryption**
   - HTTPS for all communications
   - Encrypted database fields (if needed)
   - Secure environment variables

2. **Privacy**
   - GDPR compliance
   - Data minimization
   - User consent management

## 8. Troubleshooting

### Common Issues

#### Smart Contract Deployment
1. **Insufficient Funds**
   - Solution: Airdrop more SOL or fund wallet

2. **Program Verification Failed**
   - Solution: Check program ID and redeploy

#### Backend Deployment
1. **Database Connection Failed**
   - Solution: Verify database credentials and network access

2. **Environment Variables Missing**
   - Solution: Check .env file and deployment configuration

#### Frontend Deployment
1. **Wallet Connection Issues**
   - Solution: Verify network configuration and program IDs

2. **API Connection Failed**
   - Solution: Check backend URL and CORS configuration

### Support Resources
1. **Documentation**
   - Official Solana docs
   - Anchor framework docs
   - NestJS documentation

2. **Community**
   - Solana Discord
   - Anchor Discord
   - Kalenda community channels

3. **Professional Support**
   - Security audit services
   - Deployment consultants
   - Infrastructure providers