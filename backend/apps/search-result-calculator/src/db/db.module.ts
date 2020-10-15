import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { MongoModule } from '@kb/mongo';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { HotelSchema, HotelSchemaKey } from './hotel/schema/hotel.schema';
import { MongoHotelRepository } from './mongo-hotel.repository';
import { HotelDocument } from './hotel/document/hotel.document';
import { HotelDocumentMapper } from './hotel/hotel-document.mapper';
import {
  ProcessingProgressSchema,
  ProcessingProgressSchemaKey
} from './processing-activity/processing-progress.schema';
import { ProcessingProgressRepository } from '../core/abstract/processing-progress.repository';
import { ProcessingProgressDocument } from './processing-activity/processing-progress.document';
import { ProcessingProgressMapper } from './processing-activity/processing-progress.mapper';
import { MongoProcessingProgressRepository } from './mongo-processing-progress.repository';

@Module({
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      { name: HotelSchemaKey, schema: HotelSchema },
    ]),
    MongoModule.register({ configClass: AppConfigService }, [
      { name: ProcessingProgressSchemaKey, schema: ProcessingProgressSchema },
    ]),
  ],
  providers: [
    {
      provide: HotelRepository,
      useFactory: (hotelModel: Model<HotelDocument>) => {
        const mapper = new HotelDocumentMapper();
        return new MongoHotelRepository(mapper, hotelModel);
      },
      inject: [getModelToken(HotelSchemaKey)],
    },
    {
      provide: ProcessingProgressRepository,
      useFactory: (hotelModel: Model<ProcessingProgressDocument>) => {
        const mapper = new ProcessingProgressMapper();
        return new MongoProcessingProgressRepository(mapper, hotelModel);
      },
      inject: [getModelToken(ProcessingProgressSchemaKey)],
    },
  ],
  exports: [
    HotelRepository,
    ProcessingProgressRepository,
  ],
})
export class DbModule {
}
