import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from '../core/core.module';
import { MqModule } from '../mq/mq.module';
import { CollectingScenarioConsumer } from './collecting-scenario.consumer';
import { RawSearchResultService } from '../core/abstract/raw-search-result.service';
import { AppRawSearchResultService } from './app-raw-search-result.service';
import { ScrapModule } from '../scrap/scrap.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { DataCollectorService } from '../core/abstract/data-collector.service';
import { AppDataCollectorService } from './app-data-collector.service';
import { FileManagerService } from './file-manager.service';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), AppConfigService),
    CoreModule,
    MqModule,
    ScrapModule,
  ],
  providers: [
    FileManagerService,
    {
      provide: RawSearchResultService,
      useClass: AppRawSearchResultService,
    },
    {
      provide: DataCollectorService,
      useClass: AppDataCollectorService,
    },
  ],
  controllers: [
    AppController,
    CollectingScenarioConsumer,
  ],
})
export class AppModule {
}
