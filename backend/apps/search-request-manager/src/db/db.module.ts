import { Module } from '@nestjs/common';
import { MongoSearchRequestRepository } from './mongo.search-request.repository';
import { SearchRequestRepository } from '../core/interface/search-request.repository';
import { ConfigService } from '@kb/config';

@Module({
  providers: [
    {
      provide: SearchRequestRepository,
      useFactory: (config: ConfigService) => {
        console.log({ config });
        return new MongoSearchRequestRepository();
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    SearchRequestRepository,
  ],
})
export class DbModule {
}
