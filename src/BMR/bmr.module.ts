import { Module } from '@nestjs/common';
import { BmrController } from './bmr.controller';
import { BmrService } from './bmr.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bmr, BmrSchema } from './schema/bmr.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bmr.name, schema: BmrSchema }])],
  controllers: [BmrController],
  providers: [BmrService],
})
export class BmrModule {}
