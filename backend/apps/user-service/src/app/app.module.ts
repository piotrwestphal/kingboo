import { Module } from '@nestjs/common';
import { SearchResultsController } from './search-results.controller';
import { SearchResultsService } from './search-results.service';
import { ConfigModule } from '@kb/config';
import { AppConfigService } from '../config/app-config.service';
import { getEnvironments } from '../config/environments';
import { logger } from '../logger';
import { UserNotificationsConsumer } from './user-notifications.consumer';
import { RestModule } from '../rest/rest.module';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    RestModule,
  ],
  controllers: [SearchResultsController, UserNotificationsConsumer],
  providers: [SearchResultsService],
})
export class AppModule {
}
