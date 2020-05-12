import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { MongoConfig } from '@kb/mongo';

export interface AppConfig extends CommonConfig, FaunaClientConfig, MongoConfig {
  readonly saveResultInJson: boolean;
  readonly userNotificationsMqClient: RabbitOptions;
}
