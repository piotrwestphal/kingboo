import { Module } from '@nestjs/common';
import { MongoSearchRequestRepository } from './mongo.search-request.repository';
import { SearchRequestRepository } from '../core/interface/search-request.repository';
import { CommonConfigService } from '@kb/config';

@Module({
  providers: [
    {
      provide: SearchRequestRepository,
      useFactory: (config: CommonConfigService) => {
        console.log({ config });
        return new MongoSearchRequestRepository();
      },
      inject: [CommonConfigService],
    },
  ],
  exports: [
    SearchRequestRepository,
  ],
})
export class DbModule {
}
