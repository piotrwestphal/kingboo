import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoModule } from '@kb/mongo';
import { TopHotelsCacheRepository } from '../core/abstract/top-hotels-cache.repository';
import { MongoCacheRepository } from './mongo-cache.repository';
import { CacheDocument } from './cache/search-request-cache.document';
import { TopHotelsDto } from '@kb/model';
import { CacheDocumentMapper } from './cache/cache-document.mapper';
import { CacheSchema } from './cache/cache.schema';

// const SearchRequestCacheSchemaKey = 'searchRequestCache'
const TopHotelsCacheSchemaKey = 'topHotelsCache'

@Module({
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      // { name: SearchRequestCacheSchemaKey, schema: CacheSchema },
      { name: TopHotelsCacheSchemaKey, schema: CacheSchema },
    ]),
  ],
  providers: [
    // {
    //   provide: SearchRequestCacheRepository,
    //   useFactory: (model: Model<CacheDocument<SearchRequestDto>>) => {
    //     const mapper = new CacheDocumentMapper();
    //     return new MongoCacheRepository(mapper, model);
    //   },
    //   inject: [getModelToken(SearchRequestCacheSchemaKey)],
    // },
    {
      provide: TopHotelsCacheRepository,
      useFactory: (model: Model<CacheDocument<TopHotelsDto>>) => {
        const mapper = new CacheDocumentMapper();
        return new MongoCacheRepository(mapper, model);
      },
      inject: [getModelToken(TopHotelsCacheSchemaKey)],
    },
  ],
  exports: [
    // SearchRequestCacheRepository,
    TopHotelsCacheRepository,
  ],
})
export class DbModule {
}
