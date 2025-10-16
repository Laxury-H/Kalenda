import { Injectable } from '@nestjs/common';
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor() {
    // Initialize connection to Solana cluster
    const network = process.env.SOLANA_NETWORK || 'devnet';
    const endpoint = process.env.SOLANA_RPC_ENDPOINT || clusterApiUrl(network as any);
    this.connection = new Connection(endpoint, 'confirmed');
  }

  async getBalance(walletAddress: string): Promise<number> {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await this.connection.getBalance(publicKey);
      // Convert lamports to SOL
      return balance / 1000000000;
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async confirmTransaction(signature: string): Promise<boolean> {
    try {
      const status = await this.connection.confirmTransaction(signature, 'confirmed');
      return status.value.err === null;
    } catch (error) {
      throw new Error(`Failed to confirm transaction: ${error.message}`);
    }
  }

  async sendTransaction(transaction: Transaction, signers: any[]): Promise<string> {
    try {
      const signature = await this.connection.sendTransaction(transaction, signers);
      return signature;
    } catch (error) {
      throw new Error(`Failed to send transaction: ${error.message}`);
    }
  }

  getConnection(): Connection {
    return this.connection;
  }
}