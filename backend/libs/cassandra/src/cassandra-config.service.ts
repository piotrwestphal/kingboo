import { NodeEnv } from '@kb/config'
import { CassandraOptions } from './cassandra-options'

export interface CassandraConfigService {
  env: NodeEnv
  cassandraKeyspace: string
  cassandraCloud: CassandraOptions['cloud']
  cassandraLocal: CassandraOptions['local']
}
