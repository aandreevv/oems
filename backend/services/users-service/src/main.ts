import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initApi } from '../app.initializer';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initApi(app);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI],
      queue: process.env.RMQ_USERS_QUEUE,
      noAck: true,
      persistent: true,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
