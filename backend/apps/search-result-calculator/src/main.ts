import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './config/app-config.service';
import { logger } from './logger';
import { GlobalExceptionFilter } from '@kb/util/global-exception.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const config = app.get(AppConfigService);
  app.enableCors({
    origin: config.corsOrigins,
  });
  app.connectMicroservice(config.mqConsumer);
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  await app.startAllMicroservicesAsync();
  await app.listen(config.port);
}

bootstrap();
