import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { User } from '../user/user.entity';
import { TimeSlot } from '../timeslot/timeslot.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  timeSlotId: number;

  @Column()
  @IsNumber()
  bidderId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => TimeSlot, timeSlot => timeSlot.bids)
  timeSlot: TimeSlot;

  @ManyToOne(() => User, user => user.id)
  bidder: User;
}