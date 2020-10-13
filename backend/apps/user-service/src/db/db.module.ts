import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoModule } from '@kb/mongo';
import { TopHotelsCacheRepository } from '../core/abstract/top-hotels-cache.repository';
import { MongoTopHotelsCacheRepository } from './mongo-top-hotels-cache.repository';
import { TopHotelsCacheDocument } from './top-hotels-cache/top-hotels-cache.document';
import { TopHotelsCacheSchema, TopHotelsCacheSchemaKey } from './top-hotels-cache/top-hotels-cache.schema';
import { TopHotelsCacheDocumentMapper } from './top-hotels-cache/top-hotels-cache-document.mapper';

@Module({
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      { name: TopHotelsCacheSchemaKey, schema: TopHotelsCacheSchema },
    ]),
  ],
  providers: [
    {
      provide: TopHotelsCacheRepository,
      useFactory: (model: Model<TopHotelsCacheDocument>) => {
        const mapper = new TopHotelsCacheDocumentMapper();
        return new MongoTopHotelsCacheRepository(mapper, model);
      },
      inject: [getModelToken(TopHotelsCacheSchemaKey)],
    },
  ],
  exports: [
    TopHotelsCacheRepository,
  ],
})
export class DbModule {
}
