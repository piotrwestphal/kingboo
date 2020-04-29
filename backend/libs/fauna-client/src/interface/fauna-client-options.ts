import { FaunaAdminDbOptions } from '@kb/fauna-client';

export interface FaunaClientOptions {
  readonly dbName?: string;
  readonly secret?: string;
  readonly adminDb?: FaunaAdminDbOptions;
}
