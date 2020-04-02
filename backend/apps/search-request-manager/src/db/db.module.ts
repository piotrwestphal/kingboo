import { Module } from '@nestjs/common';
import { MongoSearchRequestRepository } from './mongo.search-request.repository';
import { SearchRequestRepository } from '../core/interface/search-request.repository';
import { MainConfigService } from '../main-config.service';

@Module({
  providers: [
    {
      provide: SearchRequestRepository,
      useFactory: (config: MainConfigService) => {
        console.log({ config });
        return new MongoSearchRequestRepository();
      },
      inject: [MainConfigService],
    },
  ],
  exports: [
    SearchRequestRepository,
  ],
})
export class DbModule {
}
