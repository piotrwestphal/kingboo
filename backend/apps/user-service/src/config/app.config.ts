import { CommonConfig } from '@kb/config';
import { MongoConfig } from '@kb/mongo';

export interface AppConfig extends CommonConfig, MongoConfig {
  readonly searchRequestsResourceAddress: string;
  readonly hotelsResourceAddress: string;
}
