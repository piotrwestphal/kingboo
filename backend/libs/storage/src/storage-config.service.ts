import { NodeEnv } from '@kb/config'
import { StorageOptions } from './storage-options'
import { CommonLoggerService } from '@kb/logger'

export interface StorageConfigService {
  env: NodeEnv
  logger: CommonLoggerService
  storageLocal: StorageOptions['local']
  storageRemote: StorageOptions['remote']
}
