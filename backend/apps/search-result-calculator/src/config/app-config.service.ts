import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo';
import { CommonLoggerService } from '@kb/logger';
import { StorageConfigService } from '@kb/storage'

export class AppConfigService extends ConfigService<AppConfig> implements MongoConfigService, StorageConfigService {

  constructor(appConfig: AppConfig, logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger);
  }

  get storageLocal() {
    return this.config.storage.local
  }

  get storageRemote() {
    return this.config.storage.remote
  }

  get mongoAddress(): string {
    return this.config.mongo.address;
  }

  get hotelsWithoutUpdateRetentionHours(): number {
    return this.config.hotelsWithoutUpdateRetentionHours;
  }

  get dataUpdatesMqClient(): RmqOptions {
    return buildRmqOptions(this.config.dataUpdatesMqClient);
  }
}
