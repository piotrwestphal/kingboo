import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { AppConfigService } from '../config/app-config.service';
import { RawSearchResultDocument, RawSearchResultSchema, RawSearchResultSchemaKey } from './raw-search-result';
import { Model } from 'mongoose';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { MongoRawSearchResultRepository } from './mongo-raw-search-result.repository';
import { MongoModule } from '@kb/mongo';

@Module({
  imports: [
    // FaunaClientModule.register({ configClass: AppConfigService }),
    MongoModule.register({ configClass: AppConfigService }, [
      { name: RawSearchResultSchemaKey, schema: RawSearchResultSchema },
    ]),
  ],
  providers: [
    {
      provide: RawSearchResultRepository,
      useFactory: (rawSearchResultModel: Model<RawSearchResultDocument>) => {
        return new MongoRawSearchResultRepository(rawSearchResultModel);
      },
      inject: [getModelToken(RawSearchResultSchemaKey)],
    },
  ],
  exports: [
    RawSearchResultRepository,
  ],
})
export class DbModule {
}
