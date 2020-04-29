import { FirestoreConfigService } from '@kb/firestore/firestore-config.service';
import { FaunaClientConfig } from '@kb/fauna-client/fauna-client.config';

export interface FirestoreConfigType<T extends FirestoreConfigService>{
  new(config: FaunaClientConfig): T;
}
