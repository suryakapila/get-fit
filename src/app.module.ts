import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BmrModule } from './BMR/bmr.module';
import { BmiModule } from './BMI/bmi.module';
import { CalorieMeterModule } from './calorieMeter/calorieMeter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FitZoneModule } from './FitZone/fitzone.module';

import * as dotenv from 'dotenv';
dotenv.config();

const imports: any[] =
  process.env.NODE_ENV === 'dev' ? [ConfigModule.forRoot()] : [];
process.env.APP_VERSION = '0.4.0';
@Module({
  imports: [
    ...imports,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BmrModule,
    BmiModule,
    CalorieMeterModule,
    FitZoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
