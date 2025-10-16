import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { User } from '../user/user.entity';

export enum DisputeStatus {
  OPEN = 'open',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum DisputeResolution {
  IN_FAVOR_OF_BUYER = 'in_favor_of_buyer',
  IN_FAVOR_OF_SELLER = 'in_favor_of_seller',
}

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  reason: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  evidence: string;

  @Column({
    type: 'enum',
    enum: DisputeStatus,
    default: DisputeStatus.OPEN,
  })
  @IsEnum(DisputeStatus)
  status: DisputeStatus;

  @Column({
    type: 'enum',
    enum: DisputeResolution,
    nullable: true,
  })
  @IsEnum(DisputeResolution)
  @IsOptional()
  resolution: DisputeResolution;

  @ManyToOne(() => User, user => user.id)
  buyer: User;

  @ManyToOne(() => User, user => user.id)
  seller: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}