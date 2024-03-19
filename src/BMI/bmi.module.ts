import { Module } from '@nestjs/common';
import { BmiController } from './bmi.controller';
import { BmiService } from './bmi.service';

@Module({
  controllers: [BmiController],
  providers: [BmiService],
})
export class BmiModule {}
