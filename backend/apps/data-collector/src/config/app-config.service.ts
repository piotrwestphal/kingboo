import { ConfigService, FaunaAdminDbOptions } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { FaunaClientConfigService } from '@kb/fauna-client';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo/mongo-config.service';
import { LaunchOptions } from 'puppeteer';

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

  get headless(): boolean {
    return !this.config.puppeteer.headlessModeOff;
  }

  get executablePath(): string {
    return this.config.puppeteer.executablePath;
  }

  get slowMo(): number {
    return this.config.puppeteer.slowMoMs;
  }

  get devtools(): boolean {
    return this.config.puppeteer.devtoolsTurnedOn;
  }

  get faunaDbName(): string {
    return this.config.fauna.dbName;
  }

  get faunaSecret(): string {
    const secret = this.config.fauna.secret;
    if (!secret) {
      throw new Error('Fauna secret not found.');
    }
    return secret;
  }

  get faunaAdminDbOptions(): FaunaAdminDbOptions {
    const options = this.config.fauna.adminDb;
    if (!options) {
      throw new Error(`Options for fauna admin db not found.`);
    }
    return options;
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
