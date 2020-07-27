import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { FirestoreClient, FirestoreModule } from '@kb/firestore';
import { FirestoreRawSearchResultRepository } from './firestore-raw-search-result.repository';
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper';
import { MongoModule } from '@kb/mongo';
import { ScrapActivitySchema, ScrapActivitySchemaKey } from './scrap-activity/scrap-activity.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository';
import { ScrapActivityDocument } from './scrap-activity/scrap-activity.document';
import { MongoScrapActivityRepository } from './mongo-scrap-activity.repository';
import { ScrapActivityDocumentMapper } from './scrap-activity/scrap-activity-document.mapper';

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
    {
      provide: ScrapActivityRepository,
      useFactory: (model: Model<ScrapActivityDocument>) => {
        const mapper = new ScrapActivityDocumentMapper();
        return new MongoScrapActivityRepository(mapper, model);
      },
      inject: [getModelToken(ScrapActivitySchemaKey)],
    },
  ],
  exports: [
    RawSearchResultRepository,
    ScrapActivityRepository,
  ],
})
export class DbModule {
}
