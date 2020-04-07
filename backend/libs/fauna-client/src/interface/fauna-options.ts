import { FaunaAdminDbOptions } from '@kb/fauna-client';

export interface FaunaOptions {
  readonly dbName: string;
  readonly secret?: string;
  readonly adminDb?: FaunaAdminDbOptions;
}
