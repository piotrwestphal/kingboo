import { CommonConfig } from '@kb/config';
import { MongoConfig } from '@kb/mongo';
import { RabbitOptions } from '@kb/rabbit'
import { FirestoreConfig } from '@kb/firestore'

export interface AppConfig extends CommonConfig, FirestoreConfig, MongoConfig {
  readonly topHotelsSelectLimit: number
  readonly userNotificationsMqClient: RabbitOptions
}
