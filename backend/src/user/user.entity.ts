import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  walletAddress: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  avatar: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  bio: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  twitter: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  linkedin: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  website: string;

  @Column({ type: 'text', array: true, default: [] })
  specialties: string[];

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}