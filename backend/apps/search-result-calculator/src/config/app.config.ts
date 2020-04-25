import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';
import { MongoConfig } from '@kb/mongo';

export interface AppConfig extends CommonConfig, FaunaClientConfig, MongoConfig {
  readonly saveResultInJson: boolean;
  readonly userNotificationsMqClient: RabbitOptions;
}
