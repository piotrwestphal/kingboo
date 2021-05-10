import { CassandraConfigService } from './cassandra-config.service'
import { CassandraConfig } from './cassandra.config'
import { CommonLoggerService } from '@kb/logger'

export interface CassandraConfigType<T extends CassandraConfigService> {
  new(config: CassandraConfig, logger: CommonLoggerService)
}
