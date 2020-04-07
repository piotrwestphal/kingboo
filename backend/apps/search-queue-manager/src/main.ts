import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './config/app-config.service';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  app.enableCors({
    origin: config.corsOrigins,
  });
  app.connectMicroservice(config.mqConsumer);
  await app.listen(config.port);
}

bootstrap();
