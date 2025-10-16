import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlotService } from './timeslot.service';
import { TimeSlotController } from './timeslot.controller';
import { TimeSlot } from './timeslot.entity';
import { UserModule } from '../user/user.module';
import { SolanaModule } from '../solana/solana.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeSlot]),
    UserModule,
    SolanaModule,
  ],
  providers: [TimeSlotService],
  controllers: [TimeSlotController],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}