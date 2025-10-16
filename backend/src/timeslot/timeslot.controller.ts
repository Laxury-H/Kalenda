import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { TimeSlot } from './timeslot.entity';

@Controller('timeslots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  async create(
    @Body() createTimeSlotDto: {
      creatorWallet: string;
      startTime: number;
      endTime: number;
      title: string;
      description: string;
      price: number;
    }
  ): Promise<TimeSlot> {
    return this.timeSlotService.createTimeSlot(
      createTimeSlotDto.creatorWallet,
      createTimeSlotDto.startTime,
      createTimeSlotDto.endTime,
      createTimeSlotDto.title,
      createTimeSlotDto.description,
      createTimeSlotDto.price
    );
  }

  @Post(':id/list')
  async list(
    @Param('id', ParseIntPipe) id: number,
    @Body('price') price: number
  ): Promise<TimeSlot> {
    return this.timeSlotService.listTimeSlot(id, price);
  }

  @Get('available')
  async getAllAvailable(): Promise<TimeSlot[]> {
    return this.timeSlotService.getAllAvailableTimeSlots();
  }

  @Get('creator/:creatorId')
  async getByCreator(
    @Param('creatorId', ParseIntPipe) creatorId: number
  ): Promise<TimeSlot[]> {
    return this.timeSlotService.getTimeSlotsByCreator(creatorId);
  }

  @Post(':id/purchase')
  async purchase(
    @Param('id', ParseIntPipe) id: number,
    @Body('buyerWallet') buyerWallet: string
  ): Promise<TimeSlot> {
    return this.timeSlotService.purchaseTimeSlot(id, buyerWallet);
  }
}