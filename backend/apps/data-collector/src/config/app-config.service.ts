import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { LaunchOptions } from 'puppeteer';
import { EmulatorOptions, FirestoreConfigService } from '@kb/firestore';
import { MongoConfigService } from '@kb/mongo';
import { CommonLoggerService } from '@kb/logger';

export class AppConfigService extends ConfigService<AppConfig> implements FirestoreConfigService, MongoConfigService {

  constructor(appConfig: AppConfig,
              logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger);
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
    return this.config.firestore.emulator;
  };

  get rawResultStorageDays(): number {
    return this.config.rawSearchResultStorageDays;
  }

  get scrapActivitiesWithoutUpdateStorageDays(): number {
    return this.config.scrapActivitiesWithoutUpdateStorageDays;
  }

  get saveRawResultAsJson(): boolean {
    return this.config.saveRawResultAsJson;
  }

  get takeScreenshotOnError(): boolean {
    return this.config.takeScreenshotOnError;
  }

  get puppeteerLaunchOptions(): LaunchOptions {
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

  get enableStylesOnResultsPage(): boolean {
    return this.config.puppeteer.enableStylesOnResultsPage;
  }

  get dataCollectionNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataCollectionNotificationsMqClient);
  }

  get dataToProcessMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataToProcessMqClient);
  }

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient);
  }

  get mongoAddress(): string {
    return this.config.mongo.address;
  }
}
