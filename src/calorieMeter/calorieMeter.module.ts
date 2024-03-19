import { Module } from '@nestjs/common';
import { CalorieMeterController } from './calorieMeter.controller';
import { CalorieMeterService } from './calorieMeter.service';
import { BmiModule } from 'src/BMI/bmi.module';
import { BmrModule } from 'src/BMR/bmr.module';
import { BmiService } from 'src/BMI/bmi.service';
import { BmrService } from 'src/BMR/bmr.service';

@Module({
  imports: [BmrModule, BmiModule],
  controllers: [CalorieMeterController],
  providers: [CalorieMeterService, BmiService, BmrService],
})
export class CalorieMeterModule {}
