import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { KalendaNft } from "../target/types/kalenda_nft";
import { expect } from "chai";

describe("kalenda-nft", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.KalendaNft as Program<KalendaNft>;

  it("Creates a time slot NFT", async () => {
    // Generate a new keypair for the NFT
    const nftKeypair = anchor.web3.Keypair.generate();
    
    // Get the metadata account PDA
    const [metadataAccount, _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        program.programId.toBuffer(),
        nftKeypair.publicKey.toBuffer(),
      ],
      program.programId
    );
    
    // Call the create_time_slot_nft instruction
    const tx = await program.methods
      .createTimeSlotNft(
        new anchor.BN(Math.floor(Date.now() / 1000)), // start_time
        new anchor.BN(Math.floor(Date.now() / 1000) + 3600), // end_time (1 hour later)
        "Consultation Session",
        "60-minute consultation session"
      )
      .accounts({
        timeSlotNft: nftKeypair.publicKey,
        creator: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([nftKeypair])
      .rpc();
    
    console.log("Transaction signature", tx);
    
    // Fetch the created NFT account
    const nftAccount = await program.account.timeSlotNft.fetch(nftKeypair.publicKey);
    
    // Verify the NFT data
    expect(nftAccount.creator.toString()).to.equal(provider.wallet.publicKey.toString());
    expect(nftAccount.title).to.equal("Consultation Session");
    expect(nftAccount.description).to.equal("60-minute consultation session");
    expect(nftAccount.status).to.eql({ available: {} });
  });
});