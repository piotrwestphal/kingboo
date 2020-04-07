import { ConfigService, FaunaAdminDbOptions } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { FaunaClientConfigService } from '@kb/fauna-client';
import { appConfigValidationSchemaMap } from './validation.schema';
import { MongoConfigService } from '@kb/mongo/mongo-config.service';

export class AppConfigService extends ConfigService<AppConfig> implements FaunaClientConfigService, MongoConfigService {

  constructor(mainConfig: AppConfig) {
    super(mainConfig, appConfigValidationSchemaMap);
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

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient);
  }
}
