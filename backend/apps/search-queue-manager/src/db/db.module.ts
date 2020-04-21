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

@Module({
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      { name: SearchRequestSchemaKey, schema: SearchRequestSchema },
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
  ],
  exports: [
    SearchRequestRepository,
  ],
})
export class DbModule {

}
