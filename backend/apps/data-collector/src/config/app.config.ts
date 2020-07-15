import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { FirestoreConfig } from '@kb/firestore';
import { MongoConfig } from '@kb/mongo';

export interface AppConfig extends CommonConfig, FirestoreConfig, MongoConfig {
  readonly rawSearchResultLimitationDays: number;
  readonly saveRawResultAsJson: boolean;
  readonly takeScreenshotOnError: boolean;
  readonly puppeteer: PuppeteerOptions;
  readonly dataCollectionNotificationsMqClient: RabbitOptions;
  readonly dataToProcessMqClient: RabbitOptions;
  readonly userNotificationsMqClient: RabbitOptions;
}
