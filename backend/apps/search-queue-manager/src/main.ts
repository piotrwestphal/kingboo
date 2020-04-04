import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { MainConfigService } from './main-config.service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const config = app.get(MainConfigService);
  app.connectMicroservice(config.mqConsumer);
  await app.listen(config.port);
}

bootstrap();
