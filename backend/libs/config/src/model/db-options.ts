
import { FaunaAdminDbOptions, FaunaDbSecrets } from '@kb/config/model/faunadb-definition';

export interface DbOptions {
  readonly faunaDbSecrets?: FaunaDbSecrets;
  readonly faunaAdminDb?: FaunaAdminDbOptions;
}
