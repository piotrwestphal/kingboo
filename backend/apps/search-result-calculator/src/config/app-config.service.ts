import { ConfigService, FaunaAdminDbOptions } from '@kb/config';
import { AppConfig } from './app.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { appConfigValidationSchemaMap } from './validation.schema';
import { FaunaClientConfigService } from '@kb/fauna-client';

export class AppConfigService extends ConfigService<AppConfig> implements FaunaClientConfigService {

  constructor(mainConfig: AppConfig) {
    super(mainConfig, appConfigValidationSchemaMap);
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

  get faunaAdminDbOptions(): FaunaAdminDbOptions {
    return this.config.fauna.adminDb;
  }

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient);
  }
}
