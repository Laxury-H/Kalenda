import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './bid.entity';
import { TimeSlotService } from '../timeslot/timeslot.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
    private readonly timeSlotService: TimeSlotService,
    private readonly userService: UserService,
  ) {}

  async placeBid(
    timeSlotId: number,
    bidderWallet: string,
    amount: number
  ): Promise<Bid> {
    // Verify the bidder exists
    const bidder = await this.userService.findOneByWalletAddress(bidderWallet);
    if (!bidder) {
      throw new Error('Bidder not found');
    }

    // Verify the time slot exists and is available for bidding
    // In a real implementation, we would check if the time slot is in auction mode

    // Create the bid
    const bid = this.bidRepository.create({
      timeSlotId,
      bidderId: bidder.id,
      amount,
    });

    return this.bidRepository.save(bid);
  }

  async getBidsForTimeSlot(timeSlotId: number): Promise<Bid[]> {
    return this.bidRepository.find({
      where: { timeSlotId },
      order: { amount: 'DESC', createdAt: 'DESC' },
      relations: ['bidder'],
    });
  }

  async getHighestBid(timeSlotId: number): Promise<Bid | null> {
    const bids = await this.getBidsForTimeSlot(timeSlotId);
    return bids.length > 0 ? bids[0] : null;
  }

  async acceptBid(bidId: number): Promise<Bid> {
    const bid = await this.bidRepository.findOne({ 
      where: { id: bidId },
      relations: ['bidder'],
    });
    
    if (!bid) {
      throw new Error('Bid not found');
    }

    // In a real implementation, we would transfer the NFT and funds
    // For now, we'll just return the bid
    
    return bid;
  }
}