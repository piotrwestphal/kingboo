import { Module } from '@nestjs/common';
import { HotelProcessor } from './hotels/hotel.processor';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { ProcessingModule } from '../processing/processing.module';
import { FileManager } from '@kb/util/file.manager';
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

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
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
        processingProgressRepository: ProcessingProgressRepository,
        dataUpdateSender: DataUpdateSender,
      ) => {
        return new ProgressMeasuringService(processingProgressRepository, dataUpdateSender)
      },
      inject: [ProcessingProgressRepository, DataUpdateSender]
    },
    {
      provide: HotelProcessor,
      useFactory: (configService: AppConfigService,
                   hotelRepository: HotelRepository,
                   messageProcessor: MessageProcessor,
                   progressMeasuringService: ProgressMeasuringService) => {
        const fileManager = new FileManager(logger);
        const hotelFactory = new HotelFactory();
        const priceCalculator = new PriceCalculator();
        return new HotelProcessor(
          configService,
          fileManager,
          hotelFactory,
          hotelRepository,
          messageProcessor,
          priceCalculator,
          progressMeasuringService,
        );
      },
      inject: [AppConfigService, HotelRepository, MessageProcessor, ProgressMeasuringService],
    },
  ],
})
export class AppModule {
}
