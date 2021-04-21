import { SearchDataPayload } from './search-data.payload'
import { SearchRequestsClient } from '../../core/abstract/search-requests.client'
import { logger } from '../../logger'
import { SearchDataMapper } from './search-data.mapper'
import { TopHotelsRepository } from '../../core/abstract/top-hotels.repository'

export class SearchDataService {

  constructor(
    private readonly searchDataMapper: SearchDataMapper,
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly topHotelsRepository: TopHotelsRepository,
  ) {
  }

  async getSearchData(): Promise<SearchDataPayload> {
    const now = Date.now()
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    logger.debug(`Search requests fetched within [${Date.now() - now}] ms`)
    const now2 = Date.now()
    const pendingSearchDataDto = searchRequests.map(async (searchRequestDto) => {
      if (!searchRequestDto.collectingStartedAt) {
        logger.warn(`Search request with search id [${searchRequestDto.searchId}] has never been collected - ` +
          `'collectingStartedAt' does not exist`)
        return this.searchDataMapper.toDto(searchRequestDto, null)
      }
      const topHotels = await this.topHotelsRepository.find(searchRequestDto.searchId)
      logger.debug(`Top hotels for search id [${searchRequestDto.searchId}] found within [${Date.now() - now2}] ms`)
      return this.searchDataMapper.toDto(searchRequestDto, topHotels)
    })
    const searchDataList = await Promise.all(pendingSearchDataDto)
    logger.debug(`Search data loaded within [${Date.now() - now}] ms`)
    return {
      searchDataList,
    }
  }
}
