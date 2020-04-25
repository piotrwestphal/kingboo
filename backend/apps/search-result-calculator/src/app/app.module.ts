import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HotelService } from './hotel.service';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { ProcessingModule } from '../processing/processing.module';
import { FileManager } from '@kb/model/file.manager';
import { DataToProcessConsumer } from './data-to-process.consumer';
import { PriceCalculator } from './price.calculator';
import { HotelFactory } from './hotel.factory';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { MessageProcessor } from '../processing/message.processor';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), AppConfigService),
    DbModule,
    MqModule,
    ProcessingModule,
  ],
  controllers: [
    AppController,
    DataToProcessConsumer,
  ],
  providers: [
    {
      provide: HotelService,
      useFactory: (hotelRepository: HotelRepository,
                   messageProcessor: MessageProcessor) => {
        const fileManager = new FileManager();
        const hotelFactory = new HotelFactory();
        const priceCalculator = new PriceCalculator();
        return new HotelService(
          fileManager,
          hotelFactory,
          hotelRepository,
          messageProcessor,
          priceCalculator,
        );
      },
      inject: [HotelRepository, MessageProcessor],
    },
  ],
})
export class AppModule {
}
