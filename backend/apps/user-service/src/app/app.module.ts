import { Module } from '@nestjs/common';
import { SearchDataController } from './search-data.controller';
import { SearchDataService } from './search-data.service';
import { ConfigModule } from '@kb/config';
import { AppConfigService } from '../config/app-config.service';
import { getEnvironments } from '../config/environments';
import { logger } from '../logger';
import { UserNotificationConsumer } from './user-notification.consumer';
import { RestModule } from '../rest/rest.module';
import { DbModule } from '../db/db.module';
import { TopHotelsCacheRepository } from '../core/abstract/top-hotels-cache.repository';
import { HotelsClient } from '../core/abstract/hotels.client';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { SearchDataMapper } from './search-data.mapper';
import { UserNotificationHandler } from '../core/abstract/user-notification.handler';
import { AppUserNotificationHandler } from './app-user-notification.handler';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    DbModule,
    RestModule,
  ],
  controllers: [SearchDataController, UserNotificationConsumer],
  providers: [
    {
      provide: UserNotificationHandler,
      useFactory: (
        hotelsClient: HotelsClient,
        topHotelsRepository: TopHotelsCacheRepository,
      ) => new AppUserNotificationHandler(hotelsClient, topHotelsRepository),
      inject: [HotelsClient, TopHotelsCacheRepository],
    },
    {
      provide: SearchDataService,
      useFactory: (
        hotelsClient: HotelsClient,
        searchRequestsClient: SearchRequestsClient,
        topHotelsCacheRepository: TopHotelsCacheRepository,
      ) => {
        const mapper = new SearchDataMapper()
        return new SearchDataService(hotelsClient, mapper, searchRequestsClient, topHotelsCacheRepository)
      },
      inject: [HotelsClient, SearchRequestsClient, TopHotelsCacheRepository]
    }],
})
export class AppModule {
}
