import { HttpModule, HttpService, Module } from '@nestjs/common';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { RestSearchRequestsClient } from './rest-search-requests.client';
import { TopHotelsClient } from '../core/abstract/top-hotels.client';
import { RestTopHotelsClient } from './rest-top-hotels.client';
import { AppConfigService } from '../config/app-config.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: SearchRequestsClient,
      useFactory: (config: AppConfigService,
                   httpService: HttpService) => {
        return new RestSearchRequestsClient(config, httpService);
      },
      inject: [AppConfigService, HttpService],
    },
    {
      provide: TopHotelsClient,
      useFactory: (config: AppConfigService,
                   httpService: HttpService) => {
        return new RestTopHotelsClient(config, httpService);
      },
      inject: [AppConfigService, HttpService],
    }
  ],
  exports: [SearchRequestsClient, TopHotelsClient],
})
export class RestModule {
}
