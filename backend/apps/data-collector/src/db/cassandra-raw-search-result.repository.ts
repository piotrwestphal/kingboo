import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository'
import { RawSearchResult } from '../core/model/RawSearchResult'
import { CassandraClient } from '@kb/cassandra'
import { RawHotelMapper } from './raw-search-result/raw-hotel.mapper'
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper'

export class CassandraRawSearchResultRepository extends RawSearchResultRepository {
  constructor(
    private readonly client: CassandraClient,
    private readonly rawHotelMapper: RawHotelMapper,
    private readonly rawSearchResultMapper: RawSearchResultMapper,
  ) {
    super()
  }

  create(rawSearchResult: RawSearchResult): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteOlderThanGivenHours(hours: number): Promise<string[]> {
    return Promise.resolve([]);
  }

  find(searchId: string): Promise<RawSearchResult> {
    return Promise.resolve(undefined);
  }
}
