import { Module } from '@nestjs/common'
import { MqModule } from '../mq/mq.module'
import { ScrapModule } from '../scrap/scrap.module'
import { ConfigModule } from '@kb/config'
import { getEnvironments } from '../config/environments'
import { AppConfigService } from '../config/app-config.service'
import { HotelsCollector } from './hotels.collector'
import { CollectingScenarioConsumer } from './collecting-scenario.consumer'
import { logger } from '../logger'
import { StorageModule } from '@kb/storage'
import { CollectHotelsScenario } from './collect-hotels.scenario'
import { CollectPlaceScenario } from './collect-place.scenario'
import { CollectingScenarioType } from '@kb/model'
import { CollectingScenarioProcessor } from './collecting-scenario.processor'
import { CollectingScenarioExecutor } from './collecting-scenario.executor'
import { CollectingScenarioMapper } from './mapper/collecting-scenario.mapper'
import { PlaceCollector } from './place.collector'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    StorageModule.register({ configClass: AppConfigService }),
    MqModule,
    ScrapModule,
  ],
  providers: [
    CollectingScenarioExecutor,
    CollectHotelsScenario,
    CollectPlaceScenario,
    HotelsCollector,
    PlaceCollector,
    {
      provide: CollectingScenarioProcessor,
      useFactory: (
        collectingScenarioExecutor: CollectingScenarioExecutor,
        collectHotelsScenario: CollectHotelsScenario,
        collectPlaceScenario: CollectPlaceScenario,
      ) => {
        const mapper = new CollectingScenarioMapper()
        const scenarios = {
          [CollectingScenarioType.COLLECT_HOTELS]: collectHotelsScenario,
          [CollectingScenarioType.COLLECT_PLACE]: collectPlaceScenario,
        }
        return new CollectingScenarioProcessor(collectingScenarioExecutor, mapper, scenarios)
      },
      inject: [CollectingScenarioExecutor, CollectHotelsScenario, CollectPlaceScenario]
    },
  ],
  controllers: [
    CollectingScenarioConsumer,
  ],
})
export class AppModule {
}
