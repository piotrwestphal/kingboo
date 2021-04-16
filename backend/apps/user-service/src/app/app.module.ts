import { Module } from '@nestjs/common'
import { SearchDataController } from './search-data.controller'
import { SearchDataService } from './search-data/search-data.service'
import { ConfigModule } from '@kb/config'
import { AppConfigService } from '../config/app-config.service'
import { getEnvironments } from '../config/environments'
import { logger } from '../logger'
import { RestModule } from '../rest/rest.module';
import { DbModule } from '../db/db.module';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { SearchDataMapper } from './search-data/search-data.mapper';
import { SearchRequestMessageConsumer } from './search-request-message.consumer';
import { AppUserNotificationHandler } from './app-user-notification.handler'
import { UserNotificationHandler } from '../core/abstract/user-notification.handler'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    DbModule,
    RestModule,
  ],
  controllers: [SearchDataController, SearchRequestMessageConsumer],
  providers: [
    {
      provide: UserNotificationHandler,
      useFactory: () => new AppUserNotificationHandler(),
    },
    {
      provide: SearchDataService,
      useFactory: (
        searchRequestsClient: SearchRequestsClient,
      ) => {
        const mapper = new SearchDataMapper()
        return new SearchDataService(
          mapper,
          searchRequestsClient,
        )
      },
      inject: [SearchRequestsClient]
    }],
})
export class AppModule {
}
