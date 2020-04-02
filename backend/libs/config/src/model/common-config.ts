import { NodeEnv } from '@kb/config/config.provider';
import { RabbitOptions } from '@kb/rabbit';

export interface CommonConfig {
  readonly nodeEnv: NodeEnv;
  readonly port: number;
  readonly corsOrigins: string;
  readonly mqConsumer: RabbitOptions;
}
