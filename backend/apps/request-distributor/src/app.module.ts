import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, RmqOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'RABBIT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            queueOptions: {
              arguments: {
                "x-message-ttl": 10000,
              }
            },
            urls: ['amqp://dev:dev@rabbitmq:5672'],
            queue: 'temp2',
          }
        } as RmqOptions)
      }
    }
  ],
})
export class AppModule {}
