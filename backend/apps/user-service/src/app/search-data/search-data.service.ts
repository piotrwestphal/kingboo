import { SearchDataPayload } from './search-data.payload';
import { SearchRequestsClient } from '../../core/abstract/search-requests.client';
import { HotelsClient } from '../../core/abstract/hotels.client';
import { logger } from '../../logger';
import { TopHotelsCacheRepository } from '../../core/abstract/top-hotels-cache.repository';
import { SearchDataMapper } from './search-data.mapper';
import { SearchRequestDto, TopHotelsDto } from '@kb/model';
import { CacheData } from '../../core/model/CacheData';

export class SearchDataService {

  constructor(
    private readonly hotelsClient: HotelsClient,
    private readonly searchDataMapper: SearchDataMapper,
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly topHotelsCacheRepository: TopHotelsCacheRepository,
  ) {
  }

  async getSearchData(): Promise<SearchDataPayload> {
    const now = Date.now()
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    const pendingSearchDataDto = searchRequests.map(async (searchRequestDto) => {
      if (!searchRequestDto.collectingStartedAt) {
        logger.warn(`Search request with search id [${searchRequestDto.searchId}] has never been collected - ` +
          `'collectingStartedAt' does not exist`)
        return this.searchDataMapper.toDto(searchRequestDto, null);
      }
      const topHotelsCache = await this.retrieveTopHotels(searchRequestDto)
      return this.searchDataMapper.toDto(searchRequestDto, topHotelsCache)
    })
    const searchDataList = await Promise.all(pendingSearchDataDto)
    logger.debug(`Search data loaded within [${Date.now() - now}] ms`);
    return {
      searchDataList,
    }
  }

  private async retrieveTopHotels(searchRequestDto: SearchRequestDto): Promise<CacheData<TopHotelsDto>> {
    const { searchId } = searchRequestDto
    const topHotelsCache = await this.topHotelsCacheRepository.find(searchId)
    if (!topHotelsCache) {
      return this.getTopHotelsAndSaveToCache(searchRequestDto)
    }
    if (this.isCacheUpToDate(searchRequestDto, topHotelsCache)) {
      return topHotelsCache
    }
    await this.topHotelsCacheRepository.delete(searchId)
    logger.debug(`Cache is obsolete for top hotels with id [${searchRequestDto.searchId}] so was deleted`)
    return this.getTopHotelsAndSaveToCache(searchRequestDto)
  }

  private async getTopHotelsAndSaveToCache(searchRequestDto: SearchRequestDto): Promise<CacheData<TopHotelsDto>> {
    const { searchId, collectingStartedAt, collectingFinishedAt } = searchRequestDto
    const topHotelsDto = await this.hotelsClient.getTopHotels(searchId, collectingStartedAt, collectingFinishedAt)
    const newCache = CacheData.create({
      searchId,
      collectingStartedAt,
      collectingFinishedAt,
      data: topHotelsDto
    })
    const cacheData = await this.topHotelsCacheRepository.create(newCache)
    logger.debug(`Top hotels with id [${searchId}] was cached`)
    return cacheData
  }

  private isCacheUpToDate = (searchRequestDto: SearchRequestDto,
                             topHotelsCache: CacheData<TopHotelsDto>): boolean =>
    searchRequestDto.collectingStartedAt === topHotelsCache.collectingStartedAt
    && searchRequestDto.collectingFinishedAt === topHotelsCache.collectingFinishedAt
}
