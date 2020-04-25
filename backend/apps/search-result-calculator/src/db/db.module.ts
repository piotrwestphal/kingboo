import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { MongoModule } from '@kb/mongo';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { HotelSchema, HotelSchemaKey } from './mongo/schema/hotel.schema';
import { MongoHotelRepository } from './mongo-hotel.repository';
import { HotelDocument } from './mongo/interface/hotel.document';
import { MongoHotelDocumentMapper } from './mongo/mongo-hotel-document.mapper';

@Module({
  // imports: [
  //   FaunaClientModule.register({ configClass: AppConfigService }),
  // ],
  // providers: [
  //   {
  //     provide: HotelRepository,
  //     useFactory: (faunaClient: FaunaClient) => {
  //       const mapper = new FaunaHotelDocumentMapper();
  //       return new FaunaHotelRepository(mapper, faunaClient);
  //     },
  //     inject: [FaunaClient],
  //   },
  // ],
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      { name: HotelSchemaKey, schema: HotelSchema },
    ]),
  ],
  providers: [
    {
      provide: HotelRepository,
      useFactory: (hotelModel: Model<HotelDocument>) => {
        const mapper = new MongoHotelDocumentMapper();
        return new MongoHotelRepository(mapper, hotelModel);
      },
      inject: [getModelToken(HotelSchemaKey)],
    },
  ],
  exports: [
    HotelRepository,
  ],
})
export class DbModule {
}
