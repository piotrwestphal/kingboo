import { SearchDataPayload } from './dto/search-data.payload';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { HotelsClient } from '../core/abstract/hotels.client';
import { logger } from '../logger';
import { TopHotelsCacheRepository } from '../core/abstract/top-hotels-cache.repository';
import { SearchDataMapper } from './search-data.mapper';
import { SearchRequestDto, TopHotelsDto } from '@kb/model';
import { TopHotelsCache } from '../core/model/TopHotelsCache';

export class SearchDataService {

  constructor(
    private readonly hotelsClient: HotelsClient,
    private readonly searchDataMapper: SearchDataMapper,
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly topHotelsCacheRepository: TopHotelsCacheRepository,
  ) {
  }

  async getSearchData(): Promise<SearchDataPayload> {
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    const pendingSearchDataDto = searchRequests.map(async (searchRequestDto) => {
      if (!searchRequestDto.collectingStartedAt) {
        logger.warn(`Search request with search id [${searchRequestDto.searchId}] has never been collected - ` +
          `'collectingStartedAt' does not exist`)
        return this.searchDataMapper.fromDto(searchRequestDto, null);
      }
      const topHotelsDto = await this.retrieveTopHotels(searchRequestDto)
      return this.searchDataMapper.fromDto(searchRequestDto, topHotelsDto)
    })
    const searchDataList = await Promise.all(pendingSearchDataDto)
    return {
      searchDataList,
    }
  }

  private async retrieveTopHotels(searchRequestDto: SearchRequestDto): Promise<TopHotelsDto> {
    const { searchId } = searchRequestDto
    const topHotelsCache = await this.topHotelsCacheRepository.find(searchId)
    if (!topHotelsCache) {
      return this.getTopHotelsAndSaveToCache(searchRequestDto)
    }
    if (this.isCacheUpToDate(searchRequestDto, topHotelsCache)) {
      return topHotelsCache.topHotels
    }
    this.topHotelsCacheRepository.delete(searchId).then(() => {
      logger.debug(`Cache is obsolete for top hotels with id [${searchRequestDto.searchId}] so was deleted`)
    })
    return this.getTopHotelsAndSaveToCache(searchRequestDto)
  }

  private async getTopHotelsAndSaveToCache(searchRequestDto: SearchRequestDto): Promise<TopHotelsDto> {
    const { searchId, collectingStartedAt, collectingFinishedAt } = searchRequestDto
    const topHotelsDto = await this.hotelsClient.getTopHotels(searchId, collectingStartedAt, collectingFinishedAt)
    const newCache = new TopHotelsCache(searchId, collectingStartedAt, collectingFinishedAt, topHotelsDto)
    const { topHotels } = await this.topHotelsCacheRepository.create(newCache)
    logger.debug(`Top hotels with id [${searchId}] was cached`)
    return topHotels
  }

  private isCacheUpToDate = (searchRequestDto: SearchRequestDto,
                             topHotelsCache: TopHotelsCache): boolean =>
    searchRequestDto.collectingStartedAt === topHotelsCache.collectingStartedAt
    && searchRequestDto.collectingFinishedAt === topHotelsCache.collectingFinishedAt
}
