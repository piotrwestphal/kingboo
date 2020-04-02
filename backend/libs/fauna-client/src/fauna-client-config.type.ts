import { FaunaClientConfigService } from '@kb/fauna-client/fauna-client-config.service';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';

export interface FaunaClientConfigType<T extends FaunaClientConfigService>{
  new(config: FaunaClientConfig): T;
}
