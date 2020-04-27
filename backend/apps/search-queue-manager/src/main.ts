import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './config/app-config.service';
import { AppModule } from './app/app.module';
import { createLogger } from '@kb/logger';

async function bootstrap() {
  const logger = createLogger({
    appLabel: 'SQM',
    logLevel: process.env.LOG_LEVEL || 'info',
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
