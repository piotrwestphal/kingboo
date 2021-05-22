import { Module } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { CassandraScrapActivityRepository } from './cassandra-scrap-activity.repository'
import { CassandraModule, CassandraWrapper } from '@kb/cassandra'

// TODO: remove
@Module({
  imports: [
    /*CassandraModule.register({
      configClass: AppConfigService,
      mapperOptions: [
        { model: RawSearchResultModelName, table: RawSearchResultTableName },
      ]
    }),*/
  ],
  providers: [
    /*{
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
    },*/
  ],
  exports: [
    // RawSearchResultRepository,
  ],
})
export class DbModule {
}
