import { Module } from '@nestjs/common';
import { SearchRequestService } from '../core/abstract/search-request.service';
import { AppSearchRequestService } from './app-search-request.service';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { SearchRequestController } from './search-request.controller';
import { SearchRequestFactory } from './search-request.factory';
import { SearchIdentifierBuilder } from '../core/search-identifier.builder';
import { DataCollectionNotificationConsumer } from './data-collection-notification.consumer';
import { ScheduleModule } from '@nestjs/schedule';
import { FreeRequestSearcher } from './scheduler/free-request.searcher';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService }),
    DbModule,
    MqModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: SearchRequestService,
      useClass: AppSearchRequestService,
    },
    {
      provide: SearchRequestFactory,
      useFactory: () => {
        const searchIdentifierBuilder = new SearchIdentifierBuilder();
        return new SearchRequestFactory(searchIdentifierBuilder);
      },
    },
    FreeRequestSearcher,
  ],
  controllers: [
    DataCollectionNotificationConsumer,
    SearchRequestController,
  ],
  exports: [
    SearchRequestService,
  ],
})
export class AppModule {

}
