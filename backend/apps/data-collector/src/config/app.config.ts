import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { FirestoreConfig } from '@kb/firestore';

export interface AppConfig extends CommonConfig, FaunaClientConfig, FirestoreConfig {
  readonly saveRawResultInJson: boolean;
  readonly takeScreenshotOnError: boolean;
  readonly puppeteer: PuppeteerOptions;
  readonly dataCollectionNotificationsMqClient: RabbitOptions;
  readonly dataToProcessMqClient: RabbitOptions;
}
