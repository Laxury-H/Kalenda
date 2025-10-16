import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { KalendaEscrow } from "../target/types/kalenda_escrow";
import { expect } from "chai";

describe("kalenda-escrow", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.KalendaEscrow as Program<KalendaEscrow>;

  it("Initializes an escrow account", async () => {
    // Generate a new keypair for the escrow
    const escrowKeypair = anchor.web3.Keypair.generate();
    
    // Generate a seller keypair
    const seller = anchor.web3.Keypair.generate();
    
    // Airdrop some SOL to the seller for testing
    const airdropTx = await provider.connection.requestAirdrop(seller.publicKey, 2000000000);
    await provider.connection.confirmTransaction(airdropTx);
    
    // Call the initialize_escrow instruction
    const tx = await program.methods
      .initializeEscrow(
        new anchor.BN(1000000000) // 1 SOL in lamports
      )
      .accounts({
        buyer: provider.wallet.publicKey,
        seller: seller.publicKey,
        escrow: escrowKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([escrowKeypair])
      .rpc();
    
    console.log("Transaction signature", tx);
    
    // Fetch the created escrow account
    const escrowAccount = await program.account.escrow.fetch(escrowKeypair.publicKey);
    
    // Verify the escrow data
    expect(escrowAccount.buyer.toString()).to.equal(provider.wallet.publicKey.toString());
    expect(escrowAccount.seller.toString()).to.equal(seller.publicKey.toString());
    expect(escrowAccount.amount.toNumber()).to.equal(1000000000);
    expect(escrowAccount.isLocked).to.be.true;
    expect(escrowAccount.disputeOpened).to.be.false;
  });

  it("Opens a dispute on an escrow", async () => {
    // Generate a new keypair for the escrow
    const escrowKeypair = anchor.web3.Keypair.generate();
    
    // Generate a seller keypair
    const seller = anchor.web3.Keypair.generate();
    
    // Airdrop some SOL to the seller for testing
    const airdropTx = await provider.connection.requestAirdrop(seller.publicKey, 2000000000);
    await provider.connection.confirmTransaction(airdropTx);
    
    // Initialize the escrow first
    await program.methods
      .initializeEscrow(
        new anchor.BN(1000000000) // 1 SOL in lamports
      )
      .accounts({
        buyer: provider.wallet.publicKey,
        seller: seller.publicKey,
        escrow: escrowKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([escrowKeypair])
      .rpc();
    
    // Open a dispute
    const disputeTx = await program.methods
      .openDispute("No-show by seller")
      .accounts({
        disputant: provider.wallet.publicKey,
        escrow: escrowKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    
    console.log("Dispute transaction signature", disputeTx);
    
    // Fetch the updated escrow account
    const escrowAccount = await program.account.escrow.fetch(escrowKeypair.publicKey);
    
    // Verify the dispute was opened
    expect(escrowAccount.disputeOpened).to.be.true;
  });
});