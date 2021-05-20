import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { MongoConfig } from '@kb/mongo';
import { StorageConfig } from '@kb/storage'

export interface AppConfig extends CommonConfig, MongoConfig, StorageConfig {
  readonly hotelsWithoutUpdateRetentionHours: number;
  readonly dataUpdatesMqClient: RabbitOptions;
}
