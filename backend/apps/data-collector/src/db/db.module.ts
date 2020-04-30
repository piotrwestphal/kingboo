import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { FirestoreClient, FirestoreModule } from '@kb/firestore';
import { FirestoreRawSearchResultRepository } from './firestore-raw-search-result.repository';
import { RawSearchResultMapper } from './raw-search-result.mapper';

@Module({
  imports: [
    FirestoreModule.register({ configClass: AppConfigService }),
  ],
  providers: [
    {
      provide: RawSearchResultRepository,
      useFactory: (firestoreClient: FirestoreClient) => {
        const mapper = new RawSearchResultMapper();
        return new FirestoreRawSearchResultRepository(firestoreClient, mapper);
      },
      inject: [FirestoreClient],
    },
  ],
  exports: [
    RawSearchResultRepository,
  ],
})
export class DbModule {
}
