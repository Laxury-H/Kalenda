import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { KalendaMarketplace } from "../target/types/kalenda_marketplace";
import { expect } from "chai";

describe("kalenda-marketplace", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.KalendaMarketplace as Program<KalendaMarketplace>;

  it("Lists a time slot for fixed price sale", async () => {
    // Generate a new keypair for the listing
    const listingKeypair = anchor.web3.Keypair.generate();
    
    // Create a mock NFT mint (in a real test, we'd create an actual NFT)
    const nftMint = anchor.web3.Keypair.generate();
    
    // Call the list_fixed_price_sale instruction
    const tx = await program.methods
      .listFixedPriceSale(
        new anchor.BN(1000000000) // 1 SOL in lamports
      )
      .accounts({
        seller: provider.wallet.publicKey,
        nftMint: nftMint.publicKey,
        listing: listingKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([listingKeypair])
      .rpc();
    
    console.log("Transaction signature", tx);
    
    // Fetch the created listing account
    const listingAccount = await program.account.listing.fetch(listingKeypair.publicKey);
    
    // Verify the listing data
    expect(listingAccount.seller.toString()).to.equal(provider.wallet.publicKey.toString());
    expect(listingAccount.nftMint.toString()).to.equal(nftMint.publicKey.toString());
    expect(listingAccount.price.toNumber()).to.equal(1000000000);
    expect(listingAccount.saleType).to.eql({ fixedPrice: {} });
    expect(listingAccount.isActive).to.be.true;
  });

  it("Places a bid on an auction", async () => {
    // Generate a new keypair for the auction
    const auctionKeypair = anchor.web3.Keypair.generate();
    
    // Create a mock NFT mint
    const nftMint = anchor.web3.Keypair.generate();
    
    // Create the auction first
    await program.methods
      .startAuction(
        new anchor.BN(500000000), // 0.5 SOL starting price
        new anchor.BN(Math.floor(Date.now() / 1000)), // start time
        new anchor.BN(Math.floor(Date.now() / 1000) + 3600) // end time (1 hour later)
      )
      .accounts({
        creator: provider.wallet.publicKey,
        nftMint: nftMint.publicKey,
        auction: auctionKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([auctionKeypair])
      .rpc();
    
    // Place a bid
    const bidder = anchor.web3.Keypair.generate();
    
    // Airdrop some SOL to the bidder for testing
    const airdropTx = await provider.connection.requestAirdrop(bidder.publicKey, 2000000000);
    await provider.connection.confirmTransaction(airdropTx);
    
    // Create a new provider for the bidder
    const bidderProvider = new anchor.AnchorProvider(provider.connection, new anchor.Wallet(bidder), {});
    
    // Place the bid
    const bidTx = await program.methods
      .placeBid(
        new anchor.BN(750000000) // 0.75 SOL bid
      )
      .accounts({
        bidder: bidder.publicKey,
        auction: auctionKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({ commitment: "confirmed" });
    
    console.log("Bid transaction signature", bidTx);
    
    // Fetch the updated auction account
    const auctionAccount = await program.account.auction.fetch(auctionKeypair.publicKey);
    
    // Verify the bid data
    expect(auctionAccount.currentBid.toNumber()).to.equal(750000000);
    expect(auctionAccount.currentBidder.toString()).to.equal(bidder.publicKey.toString());
  });
});