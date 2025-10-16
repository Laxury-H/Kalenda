import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { Bid } from './bid.entity';
import { TimeSlotModule } from '../timeslot/timeslot.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid]),
    TimeSlotModule,
    UserModule,
  ],
  providers: [BidService],
  controllers: [BidController],
  exports: [BidService],
})
export class BidModule {}