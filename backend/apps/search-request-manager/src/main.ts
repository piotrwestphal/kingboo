import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@kb/config';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: config.rmqConsumerOptions,
  });
  await app.listen(config.port);
}
bootstrap();
