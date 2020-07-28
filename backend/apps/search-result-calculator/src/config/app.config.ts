import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { MongoConfig } from '@kb/mongo';

export interface AppConfig extends CommonConfig, MongoConfig {
  readonly saveResultAsJson: boolean;
  readonly hotelsWithoutUpdateStorageDays: number;
  readonly userNotificationsMqClient: RabbitOptions;
}
