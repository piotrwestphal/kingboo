import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { FirestoreClient, FirestoreModule } from '@kb/firestore';
import { FirestoreRawSearchResultRepository } from './firestore-raw-search-result.repository';
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper';
import { MongoModule } from '@kb/mongo';
import { ScrapActivitySchema, ScrapActivitySchemaKey } from './scrap-activity/scrap-activity.schema';

@Module({
  imports: [
    FirestoreModule.register({ configClass: AppConfigService }),
    MongoModule.register({ configClass: AppConfigService }, [
      { name: ScrapActivitySchemaKey, schema: ScrapActivitySchema },
    ]),
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
