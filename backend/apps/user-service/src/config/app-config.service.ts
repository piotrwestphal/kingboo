import { ConfigService } from '@kb/config';
import { AppConfig } from './app.config';
import { appConfigValidationSchemaMap } from './validation.schema';
import { CommonLoggerService } from '@kb/logger';

export class AppConfigService extends ConfigService<AppConfig> {

  constructor(appConfig: AppConfig, logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger);
  }

  get searchRequestsResourceAddress(): string {
    return this.config.searchRequestsResourceAddress;
  }

  get hotelsResourceAddress(): string {
    return this.config.hotelsResourceAddress;
  }
}
