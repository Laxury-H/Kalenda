import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { Dispute, DisputeStatus, DisputeResolution } from './dispute.entity';

@Controller('disputes')
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @Post()
  async create(@Body() createDisputeDto: { 
    buyerId: number; 
    sellerId: number; 
    reason: string; 
    evidence?: string 
  }): Promise<Dispute> {
    return this.disputeService.createDispute(
      createDisputeDto.buyerId,
      createDisputeDto.sellerId,
      createDisputeDto.reason,
      createDisputeDto.evidence
    );
  }

  @Put(':id/resolve')
  async resolve(
    @Param('id') id: number,
    @Body('resolution') resolution: DisputeResolution
  ): Promise<Dispute> {
    return this.disputeService.resolveDispute(id, resolution);
  }

  @Put(':id/evidence')
  async submitEvidence(
    @Param('id') id: number,
    @Body('evidence') evidence: string
  ): Promise<Dispute> {
    return this.disputeService.submitEvidence(id, evidence);
  }

  @Get()
  async findAll(): Promise<Dispute[]> {
    return this.disputeService.findAll();
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: DisputeStatus): Promise<Dispute[]> {
    return this.disputeService.findByStatus(status);
  }
}