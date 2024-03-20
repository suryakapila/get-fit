import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const port = process.env.PORT || 3001;
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DATABASE_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  //routes go here
  // ...

  app.use('*', (req: Request, res: Response) => {
    res.json({ everything: 'is awesome' });
  });
  connectDB().then(async () => {
    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
}
bootstrap();
