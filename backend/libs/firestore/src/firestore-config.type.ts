import { FirestoreConfigService } from '@kb/firestore/firestore-config.service'
import { FirestoreConfig } from '@kb/firestore/firestore.config'
import { CommonLoggerService } from '@kb/logger'

export interface FirestoreConfigType<T extends FirestoreConfigService> {
  new(config: FirestoreConfig, logger: CommonLoggerService): T
}
