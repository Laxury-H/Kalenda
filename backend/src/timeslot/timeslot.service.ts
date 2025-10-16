import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot, TimeSlotStatus } from './timeslot.entity';
import { UserService } from '../user/user.service';
import { SolanaService } from '../solana/solana.service';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
    private readonly userService: UserService,
    private readonly solanaService: SolanaService,
  ) {}

  async createTimeSlot(
    creatorWallet: string,
    startTime: number,
    endTime: number,
    title: string,
    description: string,
    price: number
  ): Promise<TimeSlot> {
    // Verify the creator exists
    const creator = await this.userService.findOneByWalletAddress(creatorWallet);
    if (!creator) {
      throw new Error('Creator not found');
    }

    // Create the time slot
    const timeSlot = this.timeSlotRepository.create({
      creatorId: creator.id,
      startTime,
      endTime,
      title,
      description,
      price,
      status: TimeSlotStatus.AVAILABLE,
    });

    return this.timeSlotRepository.save(timeSlot);
  }

  async listTimeSlot(
    timeSlotId: number,
    price: number
  ): Promise<TimeSlot> {
    const timeSlot = await this.timeSlotRepository.findOne({ where: { id: timeSlotId } });
    if (!timeSlot) {
      throw new Error('Time slot not found');
    }

    // Update the time slot with the listing price
    timeSlot.price = price;
    timeSlot.status = TimeSlotStatus.AVAILABLE;
    
    return this.timeSlotRepository.save(timeSlot);
  }

  async getAllAvailableTimeSlots(): Promise<TimeSlot[]> {
    return this.timeSlotRepository.find({ 
      where: { status: TimeSlotStatus.AVAILABLE },
      relations: ['creator'],
    });
  }

  async getTimeSlotsByCreator(creatorId: number): Promise<TimeSlot[]> {
    return this.timeSlotRepository.find({ 
      where: { creatorId },
      order: { createdAt: 'DESC' },
    });
  }

  async purchaseTimeSlot(
    timeSlotId: number,
    buyerWallet: string
  ): Promise<TimeSlot> {
    // Verify the buyer exists
    const buyer = await this.userService.findOneByWalletAddress(buyerWallet);
    if (!buyer) {
      throw new Error('Buyer not found');
    }

    // Get the time slot
    const timeSlot = await this.timeSlotRepository.findOne({ where: { id: timeSlotId } });
    if (!timeSlot) {
      throw new Error('Time slot not found');
    }

    if (timeSlot.status !== TimeSlotStatus.AVAILABLE) {
      throw new Error('Time slot is not available for purchase');
    }

    // Update the time slot
    timeSlot.buyerId = buyer.id;
    timeSlot.status = TimeSlotStatus.SOLD;
    
    return this.timeSlotRepository.save(timeSlot);
  }
}