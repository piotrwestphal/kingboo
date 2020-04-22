import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo/mongo-config.service';

export class AppConfigService extends ConfigService<AppConfig> implements MongoConfigService {

  constructor(mainConfig: AppConfig) {
    super(mainConfig, appConfigValidationSchemaMap);
  }

  get mongoAddress(): string {
    return this.config.mongo.address;
  }

  get collectingScenarioMqClient(): RmqOptions {
    return buildRmqOptions(this.config.collectingScenarioMqClient);
  }

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient);
  }
}
