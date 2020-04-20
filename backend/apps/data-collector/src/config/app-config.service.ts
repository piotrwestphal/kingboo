import { ConfigService, FaunaAdminDbOptions } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo/mongo-config.service';
import { LaunchOptions } from 'puppeteer';
import { FaunaClientConfigService } from '@kb/fauna-client';

export class AppConfigService extends ConfigService<AppConfig> implements FaunaClientConfigService, MongoConfigService {

  constructor(mainConfig: AppConfig) {
    super(mainConfig, appConfigValidationSchemaMap);
  }

  get saveRawResultInJson(): boolean {
    return this.config.saveRawResultInJson;
  }

  get takeScreenshotOnError(): boolean {
    return this.config.takeScreenshotOnError;
  }

  get puppeteerOptions(): LaunchOptions {
    const {
      executablePath,
      headlessModeOff,
      devtoolsTurnedOn,
      slowMoMs,
    } = this.config.puppeteer;
    return {
      executablePath,
      headless: !headlessModeOff,
      slowMo: slowMoMs,
      devtools: devtoolsTurnedOn,
    };
  }

  get faunaDbName(): string {
    return this.config.fauna.dbName;
  }

  get faunaSecret(): string {
    return this.config.fauna.secret;
  }

  get faunaAdminDbOptions(): FaunaAdminDbOptions {
    return this.config.fauna.adminDb;
  }

  get mongoAddress(): string {
    return this.config.mongo.address;
  }

  get dataCollectionNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataCollectionNotificationsMqClient);
  }

  get dataToProcessMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataToProcessMqClient);
  }
}
