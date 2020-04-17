import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { MongoConfig } from '@kb/mongo/mongo.config';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';

export interface AppConfig extends CommonConfig, MongoConfig {
  readonly collectingScenarioMqClient: RabbitOptions;
  readonly userNotificationsMqClient: RabbitOptions;
  readonly mongo: MongoOptions;
}
