import { SearchDataPayload } from './search-data.payload'
import { SearchRequestsClient } from '../../core/abstract/search-requests.client'
import { logger } from '../../logger'
import { SearchDataMapper } from './search-data.mapper'
import { TopHotelsRepository } from '../../core/abstract/top-hotels.repository'
import { SearchDataDto, SearchRequestDto } from '@kb/model'

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
    const [collected, notCollectedEvenOnce] = this.divideByCollectingState(searchRequests)
    const withTopHotels = await this.findAndCombine(collected)
    const withoutTopHotels = notCollectedEvenOnce.map(v => this.searchDataMapper.toDto(v, null))
    logger.debug(`Search data loaded within [${Date.now() - now}] ms`)
    return {
      searchDataList: withTopHotels.concat(withoutTopHotels)
    }
  }

  private async findAndCombine(searchRequests: SearchRequestDto[]): Promise<SearchDataDto[]> {
    const searchIds = searchRequests.map(v => v.searchId)
    const topHotels = await this.topHotelsRepository.findAllBySearchIds(searchIds)
    return searchRequests.map((v, i) => this.searchDataMapper.toDto(v, topHotels[i]))
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
