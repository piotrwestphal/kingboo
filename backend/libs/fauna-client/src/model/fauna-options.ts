
import { FaunaAdminDbOptions } from '@kb/fauna-client';

export interface FaunaOptions {
  readonly secret?: string;
  readonly faunaAdminDb?: FaunaAdminDbOptions;
}
