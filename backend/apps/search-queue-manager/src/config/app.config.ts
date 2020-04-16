import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';
import { MongoConfig } from '@kb/mongo/mongo.config';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';

export interface AppConfig extends CommonConfig, FaunaClientConfig, MongoConfig {
  readonly collectingScenarioMqClient: RabbitOptions;
  readonly userNotificationsMqClient: RabbitOptions;
  readonly mongo: MongoOptions;
}
