import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI],
      queue: process.env.RMQ_EVENTS_QUEUE,
      noAck: true,
      persistent: true,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.port || 3003);
}
bootstrap();
