import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { FaunaAdminDbOptions, FaunaClientConfigService } from '@kb/fauna-client';
import { MongoConfigService } from '@kb/mongo';

export class AppConfigService extends ConfigService<AppConfig> implements FaunaClientConfigService, MongoConfigService {

  constructor(appConfig: AppConfig) {
    super(appConfig, appConfigValidationSchemaMap);
  }

  get saveResultInJson(): boolean {
    return this.config.saveResultInJson;
  }

  get faunaDbName(): string {
    return this.config.fauna.dbName;
  }

  get faunaSecret(): string {
    return this.config.fauna.secret;
  }

  get mongoAddress(): string {
    return this.config.mongo.address;
  }

  get faunaAdminDbOptions(): FaunaAdminDbOptions {
    return this.config.fauna.adminDb;
  }

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient);
  }
}
