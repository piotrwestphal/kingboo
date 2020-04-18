import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { RawSearchResultSchema, RawSearchResultSchemaKey } from './raw-search-result';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { MongoModule } from '@kb/mongo';
import { FaunaClient, FaunaClientModule } from '@kb/fauna-client';
import { FaunaRawSearchResultRepository } from './fauna-raw-search-result.repository';

@Module({
  imports: [
    FaunaClientModule.register({ configClass: AppConfigService }),
    MongoModule.register({ configClass: AppConfigService }, [
      { name: RawSearchResultSchemaKey, schema: RawSearchResultSchema },
    ]),
  ],
  providers: [
    /*{
      provide: RawSearchResultRepository,
      useFactory: (rawSearchResultModel: Model<RawSearchResultDocument>) => {
        return new MongoRawSearchResultRepository(rawSearchResultModel);
      },
      inject: [getModelToken(RawSearchResultSchemaKey)],
    },*/
    {
      provide: RawSearchResultRepository,
      useFactory: (faunaClient: FaunaClient) => {
        return new FaunaRawSearchResultRepository(faunaClient);
      },
      inject: [FaunaClient],
    },
  ],
  exports: [
    RawSearchResultRepository,
  ],
})
export class DbModule {
}
