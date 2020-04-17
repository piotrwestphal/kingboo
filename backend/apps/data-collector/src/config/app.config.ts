import { CommonConfig } from '@kb/config';
import { RabbitOptions } from '@kb/rabbit';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';
import { MongoConfig } from '@kb/mongo/mongo.config';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';

export interface AppConfig extends CommonConfig, MongoConfig {
  readonly saveRawResultInJson: boolean;
  readonly takeScreenshotOnError: boolean;
  readonly puppeteer: PuppeteerOptions;
  readonly dataCollectionNotificationsMqClient: RabbitOptions;
  readonly dataToProcessMqClient: RabbitOptions;
  readonly mongo: MongoOptions;
}
