import { ConfigService } from '@kb/config'
import { AppConfig } from './app.config'
import { appConfigValidationSchemaMap } from './validation.schema'
import { CommonLoggerService } from '@kb/logger'
import { MongoConfigService } from '@kb/mongo'
import { RmqOptions } from '@nestjs/microservices'
import { buildRmqOptions } from '@kb/rabbit'
import { EmulatorOptions, FirestoreConfigService } from '@kb/firestore'

export class AppConfigService extends ConfigService<AppConfig> implements MongoConfigService, FirestoreConfigService {

  constructor(appConfig: AppConfig, logger: CommonLoggerService) {
    super(appConfig, appConfigValidationSchemaMap, logger)
  }

  get topHotelsSelectLimit(): number {
    return this.config.topHotelsSelectLimit
  }

  get mongoPrimaryAddress(): string {
    return this.config.mongo.primaryAddress
  }

  get userNotificationsMqClient(): RmqOptions {
    return buildRmqOptions(this.config.userNotificationsMqClient)
  }

  get projectId(): string {
    return this.config.firestore.projectId
  }

  get clientEmail(): string {
    return this.config.firestore.clientEmail;
  }

  get rawClientKey(): string {
    return this.config.firestore.rawClientKey;
  }

  get emulator(): EmulatorOptions {
    return this.config.firestore.emulator
  }
}
