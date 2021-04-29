import { CassandraConfigService } from '@kb/cassandra/cassandra-config.service'
import { CassandraConfig } from '@kb/cassandra/cassandra.config'
import { CommonLoggerService } from '@kb/logger'

export interface CassandraConfigType<T extends CassandraConfigService> {
  new(config: CassandraConfig, logger: CommonLoggerService)
}
