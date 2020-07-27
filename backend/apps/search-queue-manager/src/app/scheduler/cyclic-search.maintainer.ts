import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { logger } from '../../logger';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { SearchRequestType } from '../../core/model/SearchRequestType';
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository';

@Injectable()
export class CyclicSearchMaintainer {

  constructor(
    private readonly cyclicSearchRepository: CyclicSearchRepository,
    private readonly searchRequestRepository: SearchRequestRepository,
  ) {
  }

  // TODO: notify about changes
  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'find-unrelated-cyclic-search-requests',
  })
  async findUnrelatedCyclicSearchRequests() {
    logger.debug(`Triggering job [find-unrelated-cyclic-search-requests]`);
    const cyclicSearchRequests = await this.searchRequestRepository.findAllWithType(SearchRequestType.CYCLIC);
    const searchIds = cyclicSearchRequests.map(v => v.searchId);
    const pendingFindingReqsBelongingToCyclicSearch = searchIds.map((searchId) =>
      this.findCyclicSearchByCyclicSearchRequest(searchId));
    const reqsBelongingToCyclicSearch = await Promise.all(pendingFindingReqsBelongingToCyclicSearch);
    const toDelete = reqsBelongingToCyclicSearch.filter(v => !v.found).map(v => v.searchId);
    if (toDelete.length) {
      const deletedCount = await this.searchRequestRepository.deleteMany(toDelete);
      logger.info(`[${deletedCount}] cyclic search requests with ids [${toDelete}] were ` +
        `deleted due to not belonging to any search cycle`);
    }
  }

  private async findCyclicSearchByCyclicSearchRequest(searchId: string): Promise<{
    found: boolean;
    searchId: string;
  }> {
    const found = await this.cyclicSearchRepository.findByCyclicSearchRequest(searchId);
    return {
      found: !!found,
      searchId,
    };
  }
}
