import { FirestoreConfigService } from '@kb/firestore/firestore-config.service';
import { FirestoreConfig } from '@kb/firestore/firestore.config';

export interface FirestoreConfigType<T extends FirestoreConfigService>{
  new(config: FirestoreConfig): T;
}
