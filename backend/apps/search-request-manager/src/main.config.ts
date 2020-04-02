import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { FaunaOptions } from '@kb/fauna-client';

export interface MainConfig extends CommonConfig {
  readonly mqClient: RabbitOptions;
  readonly db: FaunaOptions;
}
