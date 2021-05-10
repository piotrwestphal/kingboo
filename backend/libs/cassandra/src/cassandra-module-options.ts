import { CassandraConfigType } from '@kb/cassandra/cassandra-config.type'
import { CommonLoggerService } from '@kb/logger'
import { CassandraMapperOption } from '@kb/cassandra/cassandra-mapper-option'
import { CassandraConfigService } from '@kb/cassandra/cassandra-config.service'

export interface CassandraModuleOptions<T extends CassandraConfigService> {
  readonly configClass: CassandraConfigType<T>
  readonly logger: CommonLoggerService
  readonly mapperOptions: CassandraMapperOption[]
}
