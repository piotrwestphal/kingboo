import { CassandraConfigType } from './cassandra-config.type'
import { CassandraMapperOption } from './cassandra-mapper-option'
import { CassandraConfigService } from './cassandra-config.service'

export interface CassandraModuleOptions<T extends CassandraConfigService> {
  readonly configClass: CassandraConfigType<T>
  readonly mapperOptions: CassandraMapperOption[]
}
