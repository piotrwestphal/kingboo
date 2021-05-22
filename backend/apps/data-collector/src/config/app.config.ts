import { CommonConfig } from '@kb/config'
import { RabbitOptions } from '@kb/rabbit'
import { PuppeteerOptions } from './puppeteer/puppeteer-options'
import { StorageConfig } from '@kb/storage'

export interface AppConfig extends CommonConfig, StorageConfig {
  readonly puppeteer: PuppeteerOptions
  readonly dataCollectionNotificationsMqClient: RabbitOptions
  readonly dataToProcessMqClient: RabbitOptions
}
