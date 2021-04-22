import { CyclicSearch } from '../../core/model/CyclicSearch'
import { CycleStartFinder } from './cycle-start.finder'
import { CreateSearchRequestMapper } from '../search-request/create-search-request.mapper'
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { SearchRequestService } from '../search-request/search-request.service';
import { logger } from '../../logger';
import { SearchRequest } from '../../core/model/SearchRequest';
import { TimeHelper } from '@kb/util';
import { DifferenceResolver } from './difference.resolver';
import { DifferenceFinder } from './difference.finder';

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
    const nowWithoutHours = TimeHelper.clearHours(new Date());
    const { dayOfTheWeek, beginSearchDaysBefore, offsetDays } = cyclicSearch;
    const startCycleDate = TimeHelper.addDays(nowWithoutHours, offsetDays)
    const cycleDaysInterval = 7; // every week
    const checkInDates = this.cycleStartFinder.findStartDaysOfWeekCycles(startCycleDate, cycleDaysInterval, dayOfTheWeek, beginSearchDaysBefore);

    const currentSearchRequests = checkInDates.map(checkInDate => this.buildCyclicSearchRequest(cyclicSearch, checkInDate));
    const currentSearchIds = currentSearchRequests.map(v => v.searchId);
    const existingSearchRequests = await this.searchRequestRepository.findAllWithSearchIds(currentSearchIds);
    const existingSearchIds = existingSearchRequests.map(v => v.searchId);
    const { searchIdsToCreate, searchIdsToDelete, differencesFound } = this.differenceFinder.find(currentSearchIds, existingSearchIds);

    if (differencesFound) {
      await this.differenceResolver.resolveDifferences(currentSearchRequests, searchIdsToCreate, searchIdsToDelete);
      const updated = cyclicSearch.updateCyclicSearchRequests(currentSearchIds);
      const saved = await this.cyclicSearchRepository.update(updated);
      logger.info(`Cyclic search with id [${saved.cyclicId}] was updated`);
      logger.debug('Updated cyclic search', saved);
    }
  }

  private buildCyclicSearchRequest({ nightsOfStay, ...rest }: CyclicSearch, checkInDate: Date): SearchRequest {
    const checkOutDate = TimeHelper.addDays(checkInDate, nightsOfStay);
    const createSearchRequest = this.createSearchRequestMapper.fromCyclicSearch(rest, checkInDate, checkOutDate);
    return this.searchRequestService.buildCyclicSearchRequest(createSearchRequest);
  }
}
