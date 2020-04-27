import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MqModule } from '../mq/mq.module';
import { CollectingScenarioConsumer } from './collecting-scenario.consumer';
import { ScrapModule } from '../scrap/scrap.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { DataCollectorService } from '../core/abstract/data-collector.service';
import { AppDataCollectorService } from './app-data-collector.service';
import { FileManager } from '@kb/util/file.manager';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService }),
    DbModule,
    MqModule,
    ScrapModule,
  ],
  providers: [
    FileManager,
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
