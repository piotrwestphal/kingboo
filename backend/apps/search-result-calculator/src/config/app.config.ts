import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';

export interface AppConfig extends CommonConfig, FaunaClientConfig {
  readonly saveResultInJson: boolean;
  readonly userNotificationsMqClient: RabbitOptions;
}
