use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::{
        create_metadata_accounts_v3, CreateMetadataAccountsV3, Metadata, 
        mpl_token_metadata::types::DataV2,
    },
    token::{Mint, Token, TokenAccount},
};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod kalenda_nft {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String, symbol: String, uri: String) -> Result<()> {
        // Create the NFT mint
        let mint = &ctx.accounts.mint;
        let token_account = &ctx.accounts.token_account;
        let mint_authority = &ctx.accounts.mint_authority;
        let metadata_account = &ctx.accounts.metadata_account;
        let token_metadata_program = &ctx.accounts.token_metadata_program;
        let token_program = &ctx.accounts.token_program;
        let system_program = &ctx.accounts.system_program;
        let rent = &ctx.accounts.rent;

        // Mint the NFT to the creator
        // This is a simplified version - actual implementation would include more metadata
        
        Ok(())
    }

    pub fn create_time_slot_nft(
        ctx: Context<CreateTimeSlotNFT>, 
        start_time: i64, 
        end_time: i64,
        title: String,
        description: String
    ) -> Result<()> {
        // Create an NFT representing a time slot
        // Metadata would include start_time, end_time, title, description
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub metadata_account: UncheckedAccount<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_metadata_program: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CreateTimeSlotNFT<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub time_slot_nft: Account<'info, TimeSlotNFT>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TimeSlotNFT {
    pub creator: Pubkey,
    pub start_time: i64,
    pub end_time: i64,
    pub title: String,
    pub description: String,
    pub status: TimeSlotStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum TimeSlotStatus {
    Available,
    Sold,
    Completed,
}