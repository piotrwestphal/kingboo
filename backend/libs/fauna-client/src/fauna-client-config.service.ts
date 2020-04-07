import { FaunaAdminDbOptions } from './interface/fauna-admin-db-options';
import { NodeEnv } from '@kb/config';

export interface FaunaClientConfigService {
  env: NodeEnv;
  faunaDbName: string;
  faunaSecret: string;
  faunaAdminDbOptions: FaunaAdminDbOptions;
}
