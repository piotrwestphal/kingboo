import { mapping } from 'cassandra-driver'
import { CassandraClient } from './cassandra.client'
import Mapper = mapping.Mapper
import ModelMapper = mapping.ModelMapper

export class CassandraWrapper {
  constructor(
    private readonly cassandraBaseMapper: Mapper,
    private readonly cassandraClient: CassandraClient,
  ) {
  }

  get = <T>(modelName: string): ModelMapper<T> => this.cassandraBaseMapper.forModel<T>(modelName)

  get client() {
    return this.cassandraClient
  }
}
