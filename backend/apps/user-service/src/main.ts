import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { logger } from '../../data-collector/src/logger';
import { AppConfigService } from '../../data-collector/src/config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const config = app.get(AppConfigService);
  app.enableCors({
    origin: config.corsOrigins,
  });
  app.connectMicroservice(config.mqConsumer);
  await app.startAllMicroservicesAsync();
  await app.listen(config.port);
}

bootstrap();
