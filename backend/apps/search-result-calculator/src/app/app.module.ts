import { Module } from '@nestjs/common';
import { TopHotelsController } from './top-hotels.controller';
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
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels/hotels.service';
import { ProgressMeasuringService } from './processing-progress/progress-measuring.service';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';
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
    TopHotelsController,
    HotelsController,
    DataToProcessConsumer,
  ],
  providers: [
    OldHotelsRemover,
    HotelsService,
    {
      provide: ProgressMeasuringService,
      useFactory: (
        processingProgressRepository: ProcessingProgressRepository,
        userNotificationSender: UserNotificationSender,
      ) => {
        return new ProgressMeasuringService(processingProgressRepository, userNotificationSender)
      },
      inject: [ProcessingProgressRepository, UserNotificationSender]
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
      inject: [AppConfigService, HotelRepository, MessageProcessor, UserNotificationSender],
    },
  ],
})
export class AppModule {
}
