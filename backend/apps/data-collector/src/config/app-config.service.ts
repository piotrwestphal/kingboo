import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { CommonLoggerService } from '@kb/logger';
import { PuppeteerLaunchOptions } from './puppeteer/puppeteer-launch-options'
import { CassandraConfigService } from '@kb/cassandra'
import { StorageConfigService } from '@kb/storage'

export class AppConfigService extends ConfigService<AppConfig> implements CassandraConfigService, StorageConfigService {

  constructor(appConfig: AppConfig,
              logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger);
  }

  get scrapActivitiesWithoutUpdateRetentionHours(): number {
    return this.config.scrapActivitiesWithoutUpdateRetentionHours;
  }

  get puppeteerLaunchOptions(): PuppeteerLaunchOptions {
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

  get storageLocal() {
    return this.config.storage.local
  }

  get storageRemote() {
    return this.config.storage.remote
  }

  get cassandraKeyspace() {
    return this.config.cassandra.keyspace
  }

  get cassandraCloud() {
    return this.config.cassandra.cloud
  }

  get cassandraLocal() {
    return this.config.cassandra.local
  }

  get dataCollectionNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataCollectionNotificationsMqClient);
  }

  get dataToProcessMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataToProcessMqClient);
  }
}
