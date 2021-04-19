import { Module } from '@nestjs/common'
import { DataUpdatesConsumer } from './data-updates.consumer'
import { TopHotelsService } from './top-hotels.service'
import { AppConfigService } from '../config/app-config.service'
import { ConfigModule } from '@kb/config'
import { getEnvironments } from '../config/environments'
import { logger } from '../logger'
import { DbModule } from '../db/db.module'
import { MqModule } from '../mq/mq.module'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    DbModule,
    MqModule,
  ],
  controllers: [DataUpdatesConsumer],
  providers: [
    TopHotelsService,
  ],
})
export class AppModule {
}
