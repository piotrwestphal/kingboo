import { SearchDataPayload } from './search-data.payload'
import { SearchRequestsClient } from '../../core/abstract/search-requests.client'
import { logger } from '../../logger'
import { SearchDataMapper } from './search-data.mapper'
import { TopHotelsRepository } from '../../core/abstract/top-hotels.repository'
import { SearchDataDto, SearchRequestDto } from '@kb/model'

export class SearchDataService {

  private readonly TOP_HOTELS_SELECTION_LIMIT = 10 // TODO: read from search request

  constructor(
    private readonly searchDataMapper: SearchDataMapper,
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly topHotelsRepository: TopHotelsRepository,
  ) {
  }

  // https://stackoverflow.com/questions/42775146/mongoose-how-to-sort-array-of-objects-returned-from-query
  // https://www.tutorialspoint.com/how-do-you-limit-an-array-sub-element-in-mongodb
  async getSearchData(): Promise<SearchDataPayload> {
    const now = Date.now()
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    logger.debug(`Search requests fetched within [${Date.now() - now}] ms`)
    const [collected, notCollectedEvenOnce] = this.divideByCollectingState(searchRequests)
    const withTopHotels = await this.findAndCombine(collected)
    // TODO: find by collect place scenario
    const withoutTopHotels = notCollectedEvenOnce.map(v => this.searchDataMapper.toDto(v, []))
    logger.debug(`Search data loaded within [${Date.now() - now}] ms`)
    return {
      searchDataList: withTopHotels.concat(withoutTopHotels)
    }
  }

  private async findAndCombine(searchRequests: SearchRequestDto[]): Promise<SearchDataDto[]> {
    const topHotelsListPending = searchRequests.map(v => this.topHotelsRepository.findBySearchId(v.searchId, this.TOP_HOTELS_SELECTION_LIMIT))
    const resolvedIndexedTopHotels = await Promise.all(topHotelsListPending)
    return searchRequests.map((v, i) => this.searchDataMapper.toDto(v, resolvedIndexedTopHotels[i]))
  }

  private divideByCollectingState(searchRequests: SearchRequestDto[]): [SearchRequestDto[], SearchRequestDto[]] {
    return searchRequests.reduce(([collected, notCollectedEvenOnce], dto) => {
      if (dto.collectingStartedAt) {
        collected.push(dto)
      } else {
        notCollectedEvenOnce.push(dto)
      }
      return [collected, notCollectedEvenOnce]
    }, [[], []] as [SearchRequestDto[], SearchRequestDto[]])
  }
}
