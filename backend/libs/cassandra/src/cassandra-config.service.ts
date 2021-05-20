import { NodeEnv } from '@kb/config'
import { CassandraOptions } from './cassandra-options'
import { CommonLoggerService } from '@kb/logger'

export interface CassandraConfigService {
  env: NodeEnv
  readonly logger: CommonLoggerService
  cassandraKeyspace: string
  cassandraCloud: CassandraOptions['cloud']
  cassandraLocal: CassandraOptions['local']
}
