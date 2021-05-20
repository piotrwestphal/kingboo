import { Module } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository'
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository'
import { CassandraScrapActivityRepository } from './cassandra-scrap-activity.repository'
import { ScrapActivityMapper } from './scrap-activity/scrap-activity.mapper'
import { CassandraRawSearchResultRepository } from './cassandra-raw-search-result.repository'
import { CassandraModule, CassandraWrapper } from '@kb/cassandra'
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper'
import { RawHotelMapper } from './raw-search-result/raw-hotel.mapper'
import { ScrapActivityModelName, ScrapActivityTableName } from './scrap-activity/scrap-activity.const'
import { RawSearchResultModelName, RawSearchResultTableName } from './raw-search-result/raw-search-result.const'
import { ScrapActivityDocument } from './scrap-activity/scrap-activity.document'
import { RawSearchResultDocument } from './raw-search-result/raw-search-result.document'

@Module({
  imports: [
    CassandraModule.register({
      configClass: AppConfigService,
      mapperOptions: [
        { model: ScrapActivityModelName, table: ScrapActivityTableName },
        { model: RawSearchResultModelName, table: RawSearchResultTableName },
      ]
    }),
  ],
  providers: [
    {
      provide: ScrapActivityRepository,
      useFactory: (
        config: AppConfigService,
        cassandraWrapper: CassandraWrapper,
      ) => {
        const mapper = new ScrapActivityMapper()
        const cassandraMapper = cassandraWrapper.get<ScrapActivityDocument>(ScrapActivityModelName)
        return new CassandraScrapActivityRepository(cassandraMapper, config, mapper)
      },
      inject: [AppConfigService, CassandraWrapper],
    },
    {
      provide: RawSearchResultRepository,
      useFactory: (
        config: AppConfigService,
        cassandraWrapper: CassandraWrapper,
      ) => {
        const hotelMapper = new RawHotelMapper()
        const rawSearchResultMapper = new RawSearchResultMapper()
        const cassandraMapper = cassandraWrapper.get<RawSearchResultDocument>(RawSearchResultModelName)
        return new CassandraRawSearchResultRepository(cassandraWrapper.client, cassandraMapper, config, hotelMapper, rawSearchResultMapper)
      },
      inject: [AppConfigService, CassandraWrapper],
    },
  ],
  exports: [
    // RawSearchResultRepository,
    ScrapActivityRepository,
  ],
})
export class DbModule {
}
