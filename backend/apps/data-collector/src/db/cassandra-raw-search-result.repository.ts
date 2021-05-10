import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository'
import { RawSearchResult } from '../core/model/RawSearchResult'
import { RawHotelMapper } from './raw-search-result/raw-hotel.mapper'
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper'
import { mapping } from 'cassandra-driver'
import { RawSearchResultDocument } from './raw-search-result/raw-search-result.document'
import { AppConfigService } from '../config/app-config.service'
import { TimeHelper } from '@kb/util'
import { CassandraClient } from '@kb/cassandra'
import { RawSearchResultTableName } from './raw-search-result/raw-search-result.const'
import ModelMapper = mapping.ModelMapper
import q = mapping.q

export class CassandraRawSearchResultRepository extends RawSearchResultRepository {
  constructor(
    private readonly cassandraClient: CassandraClient,
    private readonly cassandraModel: ModelMapper<RawSearchResultDocument>,
    private readonly config: AppConfigService,
    private readonly rawHotelMapper: RawHotelMapper,
    private readonly rawSearchResultMapper: RawSearchResultMapper,
  ) {
    super()
  }

  async create({ hotels, ...restRawSearchResultValues }: RawSearchResult): Promise<void> {
    const rawHotelDocs = hotels.map(rawHotel => this.rawHotelMapper.toDoc(rawHotel))
    const rawSearchResultDoc = this.rawSearchResultMapper.toDoc(restRawSearchResultValues, rawHotelDocs)
    const retentionTimeSec = this.config.rawResultRetentionHours * TimeHelper.HOUR_IN_SEC
    await this.cassandraModel.insert(rawSearchResultDoc, { ttl: retentionTimeSec })
  }

  async find(searchId: string, createdAt: Date): Promise<RawSearchResult> {
    const { hotels, ...restRawSearchResultDocValues } = await this.cassandraModel.get({
      searchId,
      createdAt: q.gt(createdAt)
    })
    const rawHotels = hotels.map(rawHotelDoc => this.rawHotelMapper.fromDoc(rawHotelDoc))
    return this.rawSearchResultMapper.fromDoc(restRawSearchResultDocValues, rawHotels)
  }

  async deleteAll(): Promise<void> {
    await this.cassandraClient.deleteAllFromTable(RawSearchResultTableName)
  }
}
