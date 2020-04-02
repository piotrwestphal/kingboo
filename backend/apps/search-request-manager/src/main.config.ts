import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';

export interface MainConfig extends CommonConfig, FaunaClientConfig {
  readonly mqClient: RabbitOptions;
}
