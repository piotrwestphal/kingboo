import { Module } from '@nestjs/common';
import { HotelProcessor } from './hotels/hotel.processor';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { ProcessingModule } from '../processing/processing.module';
import { DataToProcessConsumer } from './data-to-process.consumer';
import { PriceCalculator } from './hotels/price.calculator';
import { HotelFactory } from './hotels/hotel.factory';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { MessageProcessor } from '../processing/message.processor';
import { logger } from '../logger';
import { ScheduleModule } from '@nestjs/schedule';
import { OldHotelsRemover } from './scheduler/old-hotels.remover';
import { ProgressMeasuringService } from './processing-progress/progress-measuring.service';
import { DataUpdateSender } from '../core/abstract/data-update.sender';
import { ProcessingProgressRepository } from '../core/abstract/processing-progress.repository';
import { FileRepository, StorageModule } from '@kb/storage'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    StorageModule.register({ configClass: AppConfigService}),
    DbModule,
    MqModule,
    ProcessingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    DataToProcessConsumer,
  ],
  providers: [
    OldHotelsRemover,
    {
      provide: ProgressMeasuringService,
      useFactory: (
        dataUpdateSender: DataUpdateSender,
        processingProgressRepository: ProcessingProgressRepository,
      ) => {
        return new ProgressMeasuringService(dataUpdateSender, processingProgressRepository)
      },
      inject: [DataUpdateSender, ProcessingProgressRepository]
    },
    {
      provide: HotelProcessor,
      useFactory: (configService: AppConfigService,
                   fileRepository: FileRepository,
                   hotelRepository: HotelRepository,
                   messageProcessor: MessageProcessor,
                   progressMeasuringService: ProgressMeasuringService) => {
        const hotelFactory = new HotelFactory();
        const priceCalculator = new PriceCalculator();
        return new HotelProcessor(
          configService,
          fileRepository,
          hotelFactory,
          hotelRepository,
          messageProcessor,
          priceCalculator,
          progressMeasuringService,
        );
      },
      inject: [AppConfigService, FileRepository, HotelRepository, MessageProcessor, ProgressMeasuringService],
    },
  ],
})
export class AppModule {
}
