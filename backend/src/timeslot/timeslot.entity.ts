import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { User } from '../user/user.entity';
import { Bid } from '../bid/bid.entity';

export enum TimeSlotStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  COMPLETED = 'completed',
}

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  creatorId: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  buyerId: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  startTime: number;

  @Column()
  @IsNumber()
  endTime: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  @Column({
    type: 'enum',
    enum: TimeSlotStatus,
    default: TimeSlotStatus.AVAILABLE,
  })
  @IsEnum(TimeSlotStatus)
  status: TimeSlotStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.createdTimeSlots)
  creator: User;

  @ManyToOne(() => User, user => user.purchasedTimeSlots)
  buyer: User;

  @OneToMany(() => Bid, bid => bid.timeSlot)
  bids: Bid[];
}