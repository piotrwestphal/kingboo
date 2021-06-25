import { Module } from '@nestjs/common'
import { DataUpdatesConsumer } from './data-updates.consumer'
import { HotelService } from './hotel.service'
import { AppConfigService } from '../config/app-config.service'
import { ConfigModule } from '@kb/config'
import { getEnvironments } from '../config/environments'
import { logger } from '../logger'
import { DbModule } from '../db/db.module'
import { MqModule } from '../mq/mq.module'
import { TopHotelsMapper } from './top-hotels.mapper'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    DbModule,
    MqModule,
  ],
  controllers: [DataUpdatesConsumer],
  providers: [
    HotelService,
    TopHotelsMapper,
  ],
})
export class AppModule {
}
