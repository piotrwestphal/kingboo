import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { FirestoreClient, FirestoreModule } from '@kb/firestore';
import { MongoModule } from '@kb/mongo';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { HotelRepository } from '../core/abstract/hotel.repository'
import { HotelDocumentMapper } from './hotel/hotel-document.mapper'
import { HotelDocument } from './hotel/hotel.document'
import { MongoHotelRepository } from './mongo-hotel.repository'
import { HotelSchema, HotelSchemaKey } from './hotel/hotel.schema'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { FirestoreTopHotelsRepository } from './firestore-top-hotels.repository'
import { TopHotelsDocumentMapper } from './top-hotels/top-hotels-document.mapper'

@Module({
  imports: [
    FirestoreModule.register({ configClass: AppConfigService }),
    MongoModule.register({ configClass: AppConfigService }, [
      { name: HotelSchemaKey, schema: HotelSchema },
    ]),
  ],
  providers: [
    {
      provide: HotelRepository,
      useFactory: (model: Model<HotelDocument>) => {
        const mapper = new HotelDocumentMapper()
        return new MongoHotelRepository(mapper, model)
      },
      inject: [getModelToken(HotelSchemaKey)],
    },
    {
      provide: TopHotelsRepository,
      useFactory: (firestoreClient: FirestoreClient) => {
        const mapper = new TopHotelsDocumentMapper()
        return new FirestoreTopHotelsRepository(firestoreClient, mapper)
      },
      inject: [FirestoreClient],
    },
  ],
  exports: [
    HotelRepository,
    TopHotelsRepository,
  ],
})
export class DbModule {
}
