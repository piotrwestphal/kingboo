import { CommonConfig } from '@kb/config'
import { RabbitOptions } from '@kb/rabbit'
import { PuppeteerOptions } from './puppeteer/puppeteer-options'
import { CassandraConfig } from '@kb/cassandra'
import { StorageConfig } from '@kb/storage'

export interface AppConfig extends CommonConfig, CassandraConfig, StorageConfig {
  readonly scrapActivitiesWithoutUpdateRetentionHours: number
  readonly puppeteer: PuppeteerOptions
  readonly dataCollectionNotificationsMqClient: RabbitOptions
  readonly dataToProcessMqClient: RabbitOptions
}
