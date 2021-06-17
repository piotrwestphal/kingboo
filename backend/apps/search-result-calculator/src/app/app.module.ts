import { Module } from '@nestjs/common';
import { HotelService } from './hotels/hotel.service';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { ProcessingModule } from '../processing/processing.module';
import { DataToProcessConsumer } from './data-to-process.consumer';
import { HotelFactory } from './hotels/hotel.factory';
import { logger } from '../logger';
import { ScheduleModule } from '@nestjs/schedule';
import { OldHotelsRemover } from './scheduler/old-hotels.remover';
import { ProgressMeasuringService } from './processing-progress/progress-measuring.service';
import { StorageModule } from '@kb/storage'
import { PriceCalculator } from './hotels/price.calculator'
import { HotelUpdater } from './hotels/hotel.updater'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    StorageModule.register({ configClass: AppConfigService }),
    DbModule,
    MqModule,
    ProcessingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    DataToProcessConsumer,
  ],
  providers: [
    HotelFactory,
    HotelService,
    OldHotelsRemover,
    PriceCalculator,
    ProgressMeasuringService,
    {
      provide: HotelUpdater,
      useFactory: () => {
        const priceCalculator = new PriceCalculator()
        return new HotelUpdater(priceCalculator)
      },
    },
  ],
})
export class AppModule {
}
