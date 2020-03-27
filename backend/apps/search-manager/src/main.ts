import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://dev:dev@rabbitmq:5672'],
      queue: 'temp2',
      prefetchCount: 1,
      queueOptions: {
        arguments: {
          'x-message-ttl': 10000,
        },
      },
      noAck: false,
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();
