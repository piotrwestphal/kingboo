import { ArrayOrObject, Client, types } from 'cassandra-driver'
import ResultSet = types.ResultSet

export class CassandraClient {
  constructor(
    private readonly client: Client,
  ) {
  }

  async findFirst<T>(query: string, params?: ArrayOrObject): Promise<T> {
    const result = await this.execute(query, params)
    return (result.first() as unknown) as T
  }

  async find<T>(query: string, params?: ArrayOrObject): Promise<T[]> {
    const result = await this.execute(query, params)
    return (result.rows as unknown) as T[]
  }

  execute(query: string, params?: ArrayOrObject): Promise<ResultSet> {
    return this.client.execute(query, params, { prepare: true })
  }
}
