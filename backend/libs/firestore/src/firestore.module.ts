import { DynamicModule, Module } from '@nestjs/common';
import { FirestoreClient, FirestoreConfigService, FirestoreConfigType } from '@kb/firestore';
import { createFirestore, createFirestoreForDevPurposes } from '@kb/firestore/create-firestore';

@Module({})
export class FirestoreModule {
  static register<T extends FirestoreConfigService>({ configClass }: { configClass: FirestoreConfigType<T> }): DynamicModule {
    const firestoreClientProvider = {
      provide: FirestoreClient,
      useFactory: (configService: T): FirestoreClient => {
        const firestore = configService.env === 'prod'
          ? createFirestore(configService)
          : createFirestoreForDevPurposes(configService);
        return new FirestoreClient(firestore);
      },
      inject: [configClass],
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
