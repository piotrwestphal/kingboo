import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { LaunchOptions } from 'puppeteer';
import { FaunaAdminDbOptions, FaunaClientConfigService } from '@kb/fauna-client';
import { EmulatorOptions, FirestoreConfigService } from '@kb/firestore';

export class AppConfigService extends ConfigService<AppConfig> implements FaunaClientConfigService, FirestoreConfigService {

  constructor(appConfig: AppConfig) {
    super(appConfig, appConfigValidationSchemaMap);
  }

  get projectId(): string {
    return this.config.firestore.projectId;
  }

  get clientEmail(): string {
    return this.config.firestore.clientEmail;
  }

  get clientKey(): string {
    return this.config.firestore.clientKey;
  }

  get emulator(): EmulatorOptions {
    return this.config.firestore.emulator
  };

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

  get dataCollectionNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataCollectionNotificationsMqClient);
  }

  get dataToProcessMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataToProcessMqClient);
  }
}
