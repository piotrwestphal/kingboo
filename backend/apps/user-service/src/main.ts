import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { GlobalExceptionFilter } from '@kb/util/global-exception.filter';
import { logger } from '../../data-collector/src/logger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://dev:dev@rabbitmq:5672'],
      queue: 'temp2',
      prefetchCount: 1,
      noAck: false,
      queueOptions: {
        arguments: {
          'x-message-ttl': 10000,
        },
      },
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();
