import { CyclicSearch } from '../../core/model/CyclicSearch'
import { CycleStartFinder } from './cycle-start.finder'
import { CreateSearchRequestMapper } from '../search-request/create-search-request.mapper'
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository'
import { SearchRequestRepository } from '../../core/abstract/search-request.repository'
import { SearchRequestService } from '../search-request/search-request.service'
import { logger } from '../../logger'
import { SearchRequest } from '../../core/model/SearchRequest'
import { TimeHelper } from '@kb/util'
import { DifferenceResolver } from './difference.resolver'
import { DifferenceFinder } from './difference.finder'

export class CycleCalculator {

  constructor(
    private readonly createSearchRequestMapper: CreateSearchRequestMapper,
    private readonly cycleStartFinder: CycleStartFinder,
    private readonly cyclicSearchRepository: CyclicSearchRepository,
    private readonly differenceFinder: DifferenceFinder,
    private readonly differenceResolver: DifferenceResolver,
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  async calculate(cyclicSearch: CyclicSearch): Promise<void> {
    const nowWithoutHours = TimeHelper.clearHours(new Date())
    const cycleDaysInterval = 7 // every week
    const { dayOfTheWeek, beginSearchDaysBefore } = cyclicSearch
    const checkInDates = this.cycleStartFinder.findStartDaysOfWeekCycles(nowWithoutHours, cycleDaysInterval, dayOfTheWeek, beginSearchDaysBefore)

    const validCurrentSearchRequests = checkInDates
      .map(checkInDate => this.buildCyclicSearchRequest(cyclicSearch, checkInDate))
      .filter(Boolean)
    const currentSearchIds = validCurrentSearchRequests.map(v => v.searchId)
    const existingSearchRequests = await this.searchRequestRepository.findAllWithSearchIds(currentSearchIds)
    const {
      searchReqsToCreate,
      searchReqsToDelete,
      differencesFound
    } = this.differenceFinder.find(validCurrentSearchRequests, existingSearchRequests)

    if (differencesFound) {
      await this.differenceResolver.resolveDifferences(searchReqsToCreate, searchReqsToDelete)
      const updated = cyclicSearch.updateCyclicSearchRequests(currentSearchIds)
      const saved = await this.cyclicSearchRepository.update(updated)
      logger.info(`Cyclic search with id [${saved.cyclicId}] was updated`)
      logger.debug('Updated cyclic search', saved)
    }
  }

  private buildCyclicSearchRequest({ nightsOfStay, ...rest }: CyclicSearch, checkInDate: Date): SearchRequest {
    const checkOutDate = TimeHelper.addDays(checkInDate, nightsOfStay)
    const createSearchRequest = this.createSearchRequestMapper.fromCyclicSearch(rest, checkInDate, checkOutDate)
    try {
      return this.searchRequestService.buildCyclicSearchRequest(createSearchRequest)
    } catch (e) {
      logger.error(`Cannot create search request for following params [${createSearchRequest}]`)
    }
  }
}
