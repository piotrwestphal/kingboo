import { HttpModule, HttpService, Module } from '@nestjs/common';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { RestSearchRequestsClient } from './rest-search-requests.client';
import { HotelsClient } from '../core/abstract/hotels.client';
import { RestHotelsClient } from './rest-hotels.client';
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
      provide: HotelsClient,
      useFactory: (config: AppConfigService,
                   httpService: HttpService) => {
        return new RestHotelsClient(config, httpService);
      },
      inject: [AppConfigService, HttpService],
    }
  ],
  exports: [SearchRequestsClient, HotelsClient],
})
export class RestModule {
}
