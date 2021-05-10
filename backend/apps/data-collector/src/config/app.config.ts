import { CommonConfig } from '@kb/config'
import { RabbitOptions } from '@kb/rabbit'
import { PuppeteerOptions } from './puppeteer/puppeteer-options'
import { CassandraConfig } from '@kb/cassandra'

export interface AppConfig extends CommonConfig, CassandraConfig {
  readonly rawSearchResultRetentionHours: number
  readonly scrapActivitiesWithoutUpdateRetentionHours: number
  readonly saveRawResultAsJson: boolean
  readonly takeScreenshotOnError: boolean
  readonly puppeteer: PuppeteerOptions
  readonly dataCollectionNotificationsMqClient: RabbitOptions
  readonly dataToProcessMqClient: RabbitOptions
}
