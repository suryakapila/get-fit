import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BmrModule } from './BMR/bmr.module';
import { BmiModule } from './BMI/bmi.module';

process.env.APP_VERSION = '0.0.1';

@Module({
  imports: [BmrModule, BmiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
