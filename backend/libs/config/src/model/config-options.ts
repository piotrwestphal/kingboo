import { NodeEnv } from '@kb/config/config.retriever';
import { MqOptions } from '@kb/config/model/mq-options';
import { DbOptions } from '@kb/config/model/db-options';

export interface ConfigOptions {
  readonly nodeEnv: NodeEnv;
  readonly port: number;
  readonly corsOrigins: string;
  readonly db?: DbOptions;
  readonly mq?: MqOptions;
}
