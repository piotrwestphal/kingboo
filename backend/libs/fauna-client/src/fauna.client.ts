import { Client, Expr, QueryOptions } from 'faunadb';

export class FaunaClient {
  constructor(private readonly client: Client) {
  }

  async query<T>(expr: Expr, options?: QueryOptions): Promise<T> {
    return this.client.query<T>(expr, options);
  }
}
