use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

declare_id!("HmbTLCywRzJv15YXHnJNRGGAxeYGZEtgc5dkhqd7SBfq");

#[program]
pub mod kalenda_marketplace {
    use super::*;

    pub fn list_fixed_price_sale(
        ctx: Context<ListFixedPriceSale>,
        price: u64,
    ) -> Result<()> {
        // List an NFT for fixed price sale
        let listing = &mut ctx.accounts.listing;
        listing.seller = ctx.accounts.seller.key();
        listing.nft_mint = ctx.accounts.nft_mint.key();
        listing.price = price;
        listing.sale_type = SaleType::FixedPrice;
        listing.is_active = true;
        
        Ok(())
    }

    pub fn buy_now(
        ctx: Context<BuyNow>,
    ) -> Result<()> {
        // Buy an NFT at fixed price
        let listing = &mut ctx.accounts.listing;
        listing.is_active = false;
        
        Ok(())
    }

    pub fn start_auction(
        ctx: Context<StartAuction>,
        starting_price: u64,
        start_time: i64,
        end_time: i64,
    ) -> Result<()> {
        // Start an auction for an NFT
        let auction = &mut ctx.accounts.auction;
        auction.creator = ctx.accounts.creator.key();
        auction.nft_mint = ctx.accounts.nft_mint.key();
        auction.starting_price = starting_price;
        auction.current_bid = starting_price;
        auction.start_time = start_time;
        auction.end_time = end_time;
        auction.is_active = true;
        
        Ok(())
    }

    pub fn place_bid(
        ctx: Context<PlaceBid>,
        amount: u64,
    ) -> Result<()> {
        // Place a bid on an auction
        let auction = &mut ctx.accounts.auction;
        
        // Check if bid is higher than current bid
        if amount <= auction.current_bid {
            return err!(MarketplaceError::BidTooLow);
        }
        
        // Update current bid
        auction.current_bid = amount;
        auction.current_bidder = ctx.accounts.bidder.key();
        
        // Implement anti-sniping logic
        let time_remaining = auction.end_time - Clock::get()?.unix_timestamp;
        if time_remaining < 300 { // 5 minutes
            auction.end_time += 300; // Extend by 5 minutes
        }
        
        Ok(())
    }

    pub fn settle_auction(
        ctx: Context<SettleAuction>,
    ) -> Result<()> {
        // Settle an auction after end time
        let auction = &mut ctx.accounts.auction;
        auction.is_active = false;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ListFixedPriceSale<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    #[account(mut)]
    pub nft_mint: Account<'info, anchor_spl::token::Mint>,
    #[account(mut)]
    pub listing: Account<'info, Listing>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyNow<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub seller: AccountInfo<'info>,
    #[account(mut)]
    pub nft_mint: Account<'info, anchor_spl::token::Mint>,
    #[account(mut)]
    pub listing: Account<'info, Listing>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StartAuction<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub nft_mint: Account<'info, anchor_spl::token::Mint>,
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceBid<'info> {
    #[account(mut)]
    pub bidder: Signer<'info>,
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SettleAuction<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub treasury: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub sale_type: SaleType,
    pub is_active: bool,
}

#[account]
pub struct Auction {
    pub creator: Pubkey,
    pub nft_mint: Pubkey,
    pub starting_price: u64,
    pub current_bid: u64,
    pub current_bidder: Pubkey,
    pub start_time: i64,
    pub end_time: i64,
    pub is_active: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SaleType {
    FixedPrice,
    Auction,
}

#[error_code]
pub enum MarketplaceError {
    #[msg("Bid amount must be higher than current bid")]
    BidTooLow,
}