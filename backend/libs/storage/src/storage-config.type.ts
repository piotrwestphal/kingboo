import { StorageConfigService } from './storage-config.service'
import { StorageConfig } from './storage.config'
import { CommonLoggerService } from '@kb/logger'

export interface StorageConfigType<T extends StorageConfigService> {
  new(config: StorageConfig, logger: CommonLoggerService)
}
