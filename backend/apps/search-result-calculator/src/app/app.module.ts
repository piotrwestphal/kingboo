import { CacheModule, Module } from '@nestjs/common';
import { TopHotelsController } from './top-hotels.controller';
import { HotelService } from './hotel.service';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { ProcessingModule } from '../processing/processing.module';
import { FileManager } from '@kb/util/file.manager';
import { DataToProcessConsumer } from './data-to-process.consumer';
import { PriceCalculator } from './price.calculator';
import { HotelFactory } from './hotel.factory';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { MessageProcessor } from '../processing/message.processor';
import { logger } from '../logger';
import { ScheduleModule } from '@nestjs/schedule';
import { OldHotelsRemover } from './scheduler/old-hotels.remover';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { TopHotelsService } from './top-hotels.service';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    DbModule,
    MqModule,
    ProcessingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    TopHotelsController,
    DataToProcessConsumer,
  ],
  providers: [
    OldHotelsRemover,
    TopHotelsService,
    {
      provide: HotelService,
      useFactory: (configService: AppConfigService,
                   hotelRepository: HotelRepository,
                   messageProcessor: MessageProcessor,
                   userNotificationSender: UserNotificationSender) => {
        const fileManager = new FileManager(logger);
        const hotelFactory = new HotelFactory();
        const priceCalculator = new PriceCalculator();
        return new HotelService(
          configService,
          fileManager,
          hotelFactory,
          hotelRepository,
          messageProcessor,
          priceCalculator,
          userNotificationSender,
        );
      },
      inject: [AppConfigService, HotelRepository, MessageProcessor, UserNotificationSender],
    },
  ],
})
export class AppModule {
}
