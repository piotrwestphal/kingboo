import { Module } from '@nestjs/common'
import { MqModule } from '../mq/mq.module'
import { ScrapModule } from '../scrap/scrap.module'
import { ConfigModule } from '@kb/config'
import { getEnvironments } from '../config/environments'
import { AppConfigService } from '../config/app-config.service'
import { DataCollectorService } from '../core/abstract/data-collector.service'
import { AppDataCollectorService } from './app-data-collector.service'
import { HotelsCollector } from './hotels.collector'
import { CollectingScenarioConsumer } from './collecting-scenario.consumer'
import { logger } from '../logger'
import { StorageModule } from '@kb/storage'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    StorageModule.register({ configClass: AppConfigService}),
    MqModule,
    ScrapModule,
  ],
  providers: [
    {
      provide: DataCollectorService,
      useClass: AppDataCollectorService,
    },
    HotelsCollector,
  ],
  controllers: [
    CollectingScenarioConsumer,
  ],
})
export class AppModule {
}
