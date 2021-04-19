import { Module } from '@nestjs/common'
import { SearchDataController } from './search-data.controller'
import { SearchDataService } from './search-data/search-data.service'
import { ConfigModule } from '@kb/config'
import { AppConfigService } from '../config/app-config.service'
import { getEnvironments } from '../config/environments'
import { logger } from '../logger'
import { RestModule } from '../rest/rest.module'
import { DbModule } from '../db/db.module'
import { SearchRequestsClient } from '../core/abstract/search-requests.client'
import { SearchDataMapper } from './search-data/search-data.mapper'
import { UserNotificationsConsumer } from './user-notifications.consumer'
import { UserNotificationHandler } from './user-notification.handler'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    DbModule,
    RestModule,
  ],
  controllers: [SearchDataController, UserNotificationsConsumer],
  providers: [
    UserNotificationHandler,
    {
      provide: SearchDataService,
      useFactory: (
        searchRequestsClient: SearchRequestsClient,
        topHotelsRepository: TopHotelsRepository,
      ) => {
        const mapper = new SearchDataMapper()
        return new SearchDataService(
          mapper,
          searchRequestsClient,
          topHotelsRepository,
        )
      },
      inject: [SearchRequestsClient, TopHotelsRepository]
    }],
})
export class AppModule {
}
