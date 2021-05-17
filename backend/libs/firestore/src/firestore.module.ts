import { DynamicModule, Module } from '@nestjs/common';
import { FirestoreClient, FirestoreConfigService, FirestoreConfigType } from '@kb/firestore';
import { createFirestore } from '@kb/firestore/create-firestore';

@Module({})
export class FirestoreModule {
  static register<T extends FirestoreConfigService>({ configClass }: { configClass: FirestoreConfigType<T> }): DynamicModule {
    const firestoreClientProvider = {
      provide: FirestoreClient,
      useFactory: (): FirestoreClient => {
        const firestore = createFirestore(
            'project-id',
            'email',
            'private-key')
        return new FirestoreClient(firestore);
      },
      inject: [],
    };
    return {
      module: FirestoreModule,
      providers: [
        firestoreClientProvider,
      ],
      exports: [
        FirestoreClient,
      ],
    };
  }
}
