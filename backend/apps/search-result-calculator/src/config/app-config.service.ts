import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo';
import { CommonLoggerService } from '@kb/logger';

export class AppConfigService extends ConfigService<AppConfig> implements MongoConfigService {

  constructor(appConfig: AppConfig, logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger);
  }

  get saveResultAsJson(): boolean {
    return this.config.saveResultAsJson;
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
