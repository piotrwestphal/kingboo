import { Client, types } from 'cassandra-driver'
import ResultSet = types.ResultSet

export class CassandraClient {
  constructor(
    private readonly client: Client
  ) {
  }

  async deleteAllFromTable(tableName: string): Promise<ResultSet> {
    return this.client.execute(`TRUNCATE ${tableName};`) // unable to parameterize table name via cassandra query
  }

  shutdown() {
    return this.client.shutdown()
  }
}
