import { Injectable } from '@nestjs/common';
import { Client } from 'faunadb';

@Injectable()
export class FaunaClient {
  constructor(private readonly client: Client) {
  }
}
