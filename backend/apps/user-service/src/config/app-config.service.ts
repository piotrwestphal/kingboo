import { ConfigService } from '@kb/config'
import { AppConfig } from './app.config'
import { appConfigValidationSchemaMap } from './validation.schema'
import { CommonLoggerService } from '@kb/logger'
import { EmulatorOptions, FirestoreConfigService } from '@kb/firestore'

export class AppConfigService extends ConfigService<AppConfig> implements FirestoreConfigService {

  constructor(appConfig: AppConfig, logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger)
  }

  get searchRequestsResourceAddress(): string {
    return this.config.searchRequestsResourceAddress
  }

  get projectId(): string {
    return this.config.firestore.projectId
  }

  get clientEmail(): string {
    return this.config.firestore.clientEmail;
  }

  get clientKey(): string {
    return this.config.firestore.clientKey;
  }

  get emulator(): EmulatorOptions {
    return this.config.firestore.emulator
  }
}
