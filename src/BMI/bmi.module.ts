import { Module } from '@nestjs/common';
import { BmiController } from './bmi.controller';
import { BmiService } from './bmi.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bmi, BmiSchema } from './schema/bmi.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bmi.name, schema: BmiSchema }])],
  controllers: [BmiController],
  providers: [BmiService],
})
export class BmiModule {}
