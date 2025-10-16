use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

declare_id!("7ZdWJct38emX6aBvC5Zb5zC7anS7v5Dz8qZ6B7dH9qQq");

#[program]
pub mod kalenda_escrow {
    use super::*;

    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        amount: u64,
    ) -> Result<()> {
        // Initialize an escrow account for a transaction
        let escrow = &mut ctx.accounts.escrow;
        escrow.buyer = ctx.accounts.buyer.key();
        escrow.seller = ctx.accounts.seller.key();
        escrow.amount = amount;
        escrow.is_locked = true;
        escrow.dispute_opened = false;
        escrow.dispute_deadline = Clock::get()?.unix_timestamp + 86400; // 24 hours
        
        Ok(())
    }

    pub fn release_funds(
        ctx: Context<ReleaseFunds>,
    ) -> Result<()> {
        // Release funds to seller after meeting period
        let escrow = &mut ctx.accounts.escrow;
        let current_time = Clock::get()?.unix_timestamp;
        
        // Check if dispute period has passed and no dispute was opened
        if current_time > escrow.dispute_deadline && !escrow.dispute_opened {
            escrow.is_locked = false;
        } else {
            return err!(EscrowError::DisputePeriodNotExpired);
        }
        
        Ok(())
    }

    pub fn open_dispute(
        ctx: Context<OpenDispute>,
        reason: String,
    ) -> Result<()> {
        // Open a dispute for a transaction
        let escrow = &mut ctx.accounts.escrow;
        let current_time = Clock::get()?.unix_timestamp;
        
        // Check if dispute period is still open
        if current_time > escrow.dispute_deadline {
            return err!(EscrowError::DisputePeriodExpired);
        }
        
        escrow.dispute_opened = true;
        // In a real implementation, we would store the dispute details off-chain
        
        Ok(())
    }

    pub fn resolve_dispute(
        ctx: Context<ResolveDispute>,
        resolution: DisputeResolution,
    ) -> Result<()> {
        // Resolve a dispute (admin only function)
        let escrow = &mut ctx.accounts.escrow;
        
        match resolution {
            DisputeResolution::ReleaseToSeller => {
                escrow.is_locked = false;
            },
            DisputeResolution::RefundToBuyer => {
                // Logic to refund buyer
                escrow.is_locked = false;
            }
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub seller: AccountInfo<'info>,
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ReleaseFunds<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct OpenDispute<'info> {
    #[account(mut)]
    pub disputant: Signer<'info>,
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolveDispute<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Escrow {
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub amount: u64,
    pub is_locked: bool,
    pub dispute_opened: bool,
    pub dispute_deadline: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum DisputeResolution {
    ReleaseToSeller,
    RefundToBuyer,
}

#[error_code]
pub enum EscrowError {
    #[msg("Dispute period has not expired yet")]
    DisputePeriodNotExpired,
    #[msg("Dispute period has expired")]
    DisputePeriodExpired,
}