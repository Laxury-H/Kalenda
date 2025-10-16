import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute, DisputeStatus, DisputeResolution } from './dispute.entity';
import { User } from '../user/user.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class DisputeService {
  constructor(
    @InjectRepository(Dispute)
    private disputeRepository: Repository<Dispute>,
    private readonly notificationService: NotificationService,
  ) {}

  async createDispute(
    buyerId: number,
    sellerId: number,
    reason: string,
    evidence?: string
  ): Promise<Dispute> {
    const dispute = this.disputeRepository.create({
      buyer: { id: buyerId } as User,
      seller: { id: sellerId } as User,
      reason,
      evidence,
      status: DisputeStatus.OPEN,
    });

    const savedDispute = await this.disputeRepository.save(dispute);
    
    // Notify both parties
    await this.notificationService.sendInAppNotification(
      buyerId, 
      `Dispute initiated for your meeting. Reason: ${reason}`
    );
    await this.notificationService.sendInAppNotification(
      sellerId, 
      `Dispute initiated for your meeting. Reason: ${reason}`
    );
    
    return savedDispute;
  }

  async resolveDispute(
    disputeId: number,
    resolution: DisputeResolution
  ): Promise<Dispute> {
    const dispute = await this.disputeRepository.findOne({ where: { id: disputeId } });
    if (!dispute) {
      throw new Error('Dispute not found');
    }

    dispute.resolution = resolution;
    dispute.status = DisputeStatus.RESOLVED;
    const savedDispute = await this.disputeRepository.save(dispute);
    
    // Notify both parties of resolution
    const resolutionText = resolution === DisputeResolution.IN_FAVOR_OF_BUYER 
      ? 'in favor of buyer' 
      : 'in favor of seller';
      
    await this.notificationService.sendInAppNotification(
      dispute.buyerId, 
      `Dispute resolved ${resolutionText}`
    );
    await this.notificationService.sendInAppNotification(
      dispute.sellerId, 
      `Dispute resolved ${resolutionText}`
    );
    
    return savedDispute;
  }

  async findAll(): Promise<Dispute[]> {
    return this.disputeRepository.find({
      relations: ['buyer', 'seller'],
    });
  }

  async findByStatus(status: DisputeStatus): Promise<Dispute[]> {
    return this.disputeRepository.find({
      where: { status },
      relations: ['buyer', 'seller'],
    });
  }

  async submitEvidence(disputeId: number, evidence: string): Promise<Dispute> {
    const dispute = await this.disputeRepository.findOne({ where: { id: disputeId } });
    if (!dispute) {
      throw new Error('Dispute not found');
    }

    dispute.evidence = evidence;
    return this.disputeRepository.save(dispute);
  }
}