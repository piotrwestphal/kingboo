import { CommonConfig } from '@kb/config';

export interface AppConfig extends CommonConfig {
  readonly searchRequestsResourceAddress: string;
  readonly hotelsResourceAddress: string;
}
