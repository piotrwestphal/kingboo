import { CommonConfig } from '@kb/config'
import { RabbitOptions } from '@kb/rabbit'
import { MongoConfig } from '@kb/mongo/mongo.config'

export interface AppConfig extends CommonConfig, MongoConfig {
  readonly collectingScenarioMqClient: RabbitOptions
  readonly userNotificationsMqClient: RabbitOptions
  readonly dataUpdatesMqClient: RabbitOptions
}
