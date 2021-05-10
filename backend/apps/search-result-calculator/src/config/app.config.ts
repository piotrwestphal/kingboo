import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { MongoConfig } from '@kb/mongo';

export interface AppConfig extends CommonConfig, MongoConfig {
  readonly saveResultAsJson: boolean;
  readonly hotelsWithoutUpdateRetentionHours: number;
  readonly dataUpdatesMqClient: RabbitOptions;
}
