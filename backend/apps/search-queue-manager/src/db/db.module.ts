import { Module } from '@nestjs/common';
import { MongoSearchRequestRepository } from './mongo-search-request.repository';
import { SearchRequestRepository } from '../core/abstract/search-request.repository';
import { AppConfigService } from '../config/app-config.service';
import { getModelToken } from '@nestjs/mongoose';
import { SearchRequestSchema, SearchRequestSchemaKey } from './schema/search-request.schema';
import { Model } from 'mongoose';
import { SearchRequestDocument } from './interface/search-request.document';
import { SearchRequestDocumentMapper } from './mapper/search-request-document.mapper';
import { MongoModule } from '@kb/mongo';
import { CyclicSearchRepository } from '../core/abstract/cyclic-search.repository';
import { CyclicSearchSchema, CyclicSearchSchemaKey } from './schema/cyclic-search.schema';
import { CyclicSearchDocument } from './interface/cyclic-search.document';
import { CyclicSearchDocumentMapper } from './mapper/cyclic-search-document.mapper';
import { MongoCyclicSearchRepository } from './mongo-cyclic-search.repository';

@Module({
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      { name: SearchRequestSchemaKey, schema: SearchRequestSchema },
    ]),
    MongoModule.register({ configClass: AppConfigService }, [
      { name: CyclicSearchSchemaKey, schema: CyclicSearchSchema },
    ]),
  ],
  providers: [
    {
      provide: SearchRequestRepository,
      useFactory: (searchRequestModel: Model<SearchRequestDocument>) => {
        const mapper = new SearchRequestDocumentMapper();
        return new MongoSearchRequestRepository(mapper, searchRequestModel);
      },
      inject: [getModelToken(SearchRequestSchemaKey)],
    },
    {
      provide: CyclicSearchRepository,
      useFactory: (cyclicSearchModel: Model<CyclicSearchDocument>) => {
        const mapper = new CyclicSearchDocumentMapper();
        return new MongoCyclicSearchRepository(cyclicSearchModel, mapper);
      },
      inject: [getModelToken(CyclicSearchSchemaKey)],
    },
  ],
  exports: [
    SearchRequestRepository,
    CyclicSearchRepository,
  ],
})
export class DbModule {

}
