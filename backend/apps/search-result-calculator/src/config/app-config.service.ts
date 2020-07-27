import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo';

export class AppConfigService extends ConfigService<AppConfig> implements MongoConfigService {

  constructor(appConfig: AppConfig) {
    super(appConfig, appConfigValidationSchemaMap);
  }

  get saveResultAsJson(): boolean {
    return this.config.saveResultAsJson;
  }

  get mongoAddress(): string {
    return this.config.mongo.address;
  }

  get hotelsStorageDays(): number {
    return this.config.hotelsStorageDays;
  }

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient);
  }
}
