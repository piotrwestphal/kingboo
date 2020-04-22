import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';

export interface AppConfig extends CommonConfig, FaunaClientConfig {
  readonly saveRawResultInJson: boolean;
  readonly takeScreenshotOnError: boolean;
  readonly puppeteer: PuppeteerOptions;
  readonly dataCollectionNotificationsMqClient: RabbitOptions;
  readonly dataToProcessMqClient: RabbitOptions;
}
