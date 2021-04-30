import { NodeEnv } from '@kb/config'
import { CassandraOptions } from '@kb/cassandra/cassandra-options'

export interface CassandraConfigService {
  env: NodeEnv
  cassandraKeyspace: string
  cassandraCloud: CassandraOptions['cloud']
  cassandraLocal: CassandraOptions['local']
}
