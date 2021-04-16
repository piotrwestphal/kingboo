import { ConfigService } from '@kb/config'
import { AppConfig } from './app.config'
import { appConfigValidationSchemaMap } from './validation.schema'
import { CommonLoggerService } from '@kb/logger'
import { MongoConfigService } from '@kb/mongo'

export class AppConfigService extends ConfigService<AppConfig> implements MongoConfigService {

  constructor(appConfig: AppConfig, logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger)
  }

  get searchRequestsResourceAddress(): string {
    return this.config.searchRequestsResourceAddress
  }

  get mongoAddress(): string {
    return this.config.mongo.address
  }
}
