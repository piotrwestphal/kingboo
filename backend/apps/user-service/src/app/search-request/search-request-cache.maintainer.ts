import { Injectable } from '@nestjs/common';
import { CollectingTimesData } from '../../core/interface/collecting-times.data';
import { logger } from '../../logger';
import { CacheData } from '../../core/model/CacheData';
import { SearchRequestsClient } from '../../core/abstract/search-requests.client';
import { SearchRequestCacheRepository } from '../../core/abstract/search-request-cache.repository';
import { SearchRequestDto } from '@kb/model';

@Injectable()
export class SearchRequestCacheMaintainer {

  constructor(
    private readonly searchRequestCacheRepository: SearchRequestCacheRepository,
    private readonly searchRequestsClient: SearchRequestsClient,
  ) {
  }

  async updateCache(searchId: string,
                    collectingTimesData: CollectingTimesData,
                    timestamp: number): Promise<void> {
    const found = await this.searchRequestCacheRepository.find(searchId)
    if (found) {
      if (this.isMessageOld(found, timestamp)) {
        logger.debug(`Message timestamp [${new Date(timestamp).toISOString()}] is earlier than the ` +
          `cache update time [${found.updatedAt.toISOString()}]. The message has expired`)
      } else {
        await this.searchRequestCacheRepository.delete(searchId)
        logger.debug(`Deleted search request cache with search id [${searchId}] due to obsolescence`)
      }
    } else {
      const searchRequestDto = await this.searchRequestsClient.getSearchRequest(searchId)
      const searchRequestCache = CacheData.create({
        searchId,
        ...collectingTimesData,
        data: searchRequestDto
      })
      await this.searchRequestCacheRepository.create(searchRequestCache)
      logger.debug(`Created search request cache with search id [${searchId}]`)
    }
  }

  private isMessageOld = (found: CacheData<SearchRequestDto>, timestamp: number) =>
    found.updatedAt.getTime() > timestamp
}
