import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './config/app-config.service';
import { createLogger } from '@kb/logger';

async function bootstrap() {
  const logger = createLogger({
    appLabel: 'DC',
    logLevel: process.env.LOG_LEVEL || 'debug',
    logOutputFolder: 'output',
    logCollectorToken: process.env.LOG_COLLECTOR_TOKEN,
  });
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
