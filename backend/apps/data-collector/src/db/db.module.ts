import { Module } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository'
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository'
import { CassandraScrapActivityRepository } from './cassandra-scrap-activity.repository'
import { ScrapActivityMapper } from './scrap-activity/scrap-activity.mapper'
import { CassandraRawSearchResultRepository } from './cassandra-raw-search-result.repository'
import { CassandraClient, CassandraModule } from '@kb/cassandra'
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper'
import { RawHotelMapper } from './raw-search-result/raw-hotel.mapper'
import { logger } from '../logger'

@Module({
  imports: [
    CassandraModule.register({ configClass: AppConfigService, logger }),
  ],
  providers: [
    {
      provide: RawSearchResultRepository,
      useFactory: (cassandraClient: CassandraClient) => {
        const hotelMapper = new RawHotelMapper()
        const rawSearchResultMapper = new RawSearchResultMapper()
        return new CassandraRawSearchResultRepository(cassandraClient, hotelMapper, rawSearchResultMapper)
      },
      inject: [CassandraClient],
    },
    {
      provide: ScrapActivityRepository,
      useFactory: (cassandraClient: CassandraClient,
                   config: AppConfigService) => {
        const mapper = new ScrapActivityMapper()
        return new CassandraScrapActivityRepository(cassandraClient, config, mapper)
      },
      inject: [CassandraClient, AppConfigService],
    },
  ],
  exports: [
    RawSearchResultRepository,
    ScrapActivityRepository,
  ],
})
export class DbModule {
}
