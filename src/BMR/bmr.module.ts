import { Module } from '@nestjs/common';
import { BmrController } from './bmr.controller';
import { BmrService } from './bmr.service';

@Module({
  controllers: [BmrController],
  providers: [BmrService],
})
export class BmrModule {}
