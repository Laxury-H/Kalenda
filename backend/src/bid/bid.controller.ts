import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BidService } from './bid.service';
import { Bid } from './bid.entity';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  async placeBid(
    @Body() placeBidDto: {
      timeSlotId: number;
      bidderWallet: string;
      amount: number;
    }
  ): Promise<Bid> {
    return this.bidService.placeBid(
      placeBidDto.timeSlotId,
      placeBidDto.bidderWallet,
      placeBidDto.amount
    );
  }

  @Get('timeslot/:timeSlotId')
  async getBidsForTimeSlot(
    @Param('timeSlotId', ParseIntPipe) timeSlotId: number
  ): Promise<Bid[]> {
    return this.bidService.getBidsForTimeSlot(timeSlotId);
  }

  @Get('timeslot/:timeSlotId/highest')
  async getHighestBid(
    @Param('timeSlotId', ParseIntPipe) timeSlotId: number
  ): Promise<Bid | null> {
    return this.bidService.getHighestBid(timeSlotId);
  }

  @Post(':id/accept')
  async acceptBid(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Bid> {
    return this.bidService.acceptBid(id);
  }
}