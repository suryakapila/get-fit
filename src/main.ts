import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const port = process.env.PORT || 3001;

  server.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DATABASE_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  connectDB().then(() => {
    console.log('Database connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  });
}
bootstrap();
