import { Module } from '@nestjs/common'
import { MongoSearchRequestRepository } from './mongo-search-request.repository'
import { SearchRequestRepository } from '../core/abstract/search-request.repository'
import { AppConfigService } from '../config/app-config.service'
import { getModelToken } from '@nestjs/mongoose'
import { SearchRequestSchema, SearchRequestSchemaKey } from './search-request/search-request.schema'
import { Model } from 'mongoose'
import { SearchRequestDocument } from './search-request/search-request.document'
import { SearchRequestDocumentMapper } from './search-request/search-request-document.mapper'
import { MongoModule } from '@kb/mongo'
import { CyclicSearchRepository } from '../core/abstract/cyclic-search.repository'
import { CyclicSearchSchema, CyclicSearchSchemaKey } from './cyclic-search/cyclic-search.schema'
import { CyclicSearchDocument } from './cyclic-search/cyclic-search.document'
import { CyclicSearchDocumentMapper } from './cyclic-search/cyclic-search-document.mapper'
import { MongoCyclicSearchRepository } from './mongo-cyclic-search.repository'

@Module({
  imports: [
    MongoModule.registerPrimary({ configClass: AppConfigService }, [
      { name: SearchRequestSchemaKey, schema: SearchRequestSchema },
      { name: CyclicSearchSchemaKey, schema: CyclicSearchSchema },
    ]),
  ],
  providers: [
    {
      provide: SearchRequestRepository,
      useFactory: (model: Model<SearchRequestDocument>) => {
        const mapper = new SearchRequestDocumentMapper()
        return new MongoSearchRequestRepository(mapper, model)
      },
      inject: [getModelToken(SearchRequestSchemaKey)],
    },
    {
      provide: CyclicSearchRepository,
      useFactory: (model: Model<CyclicSearchDocument>) => {
        const mapper = new CyclicSearchDocumentMapper()
        return new MongoCyclicSearchRepository(mapper, model)
      },
      inject: [getModelToken(CyclicSearchSchemaKey)],
    },
  ],
  exports: [
    CyclicSearchRepository,
    SearchRequestRepository,
  ],
})
export class DbModule {

}
