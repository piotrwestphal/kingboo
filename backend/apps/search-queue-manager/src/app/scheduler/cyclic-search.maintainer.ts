import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { logger } from '../../logger'
import { SearchRequestRepository } from '../../core/abstract/search-request.repository'
import { SearchRequestType } from '../../core/model/SearchRequestType'
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository'
import { UserNotificationSender } from '../../core/abstract/user-notification.sender'
import { DataUpdateSender } from '../../core/abstract/data-update.sender'
import { SearchRequest } from '../../core/model/SearchRequest'

@Injectable()
export class CyclicSearchMaintainer {

  constructor(
    private readonly cyclicSearchRepository: CyclicSearchRepository,
    private readonly dataUpdateSender: DataUpdateSender,
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly userNotificationSender: UserNotificationSender,
  ) {
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'find-unrelated-cyclic-search-requests',
  })
  async findUnrelatedCyclicSearchRequests() {
    logger.debug(`Triggering job [find-unrelated-cyclic-search-requests]`)
    const cyclicSearchRequests = await this.searchRequestRepository.findAllWithType(SearchRequestType.CYCLIC)
    const pendingFindingReqsBelongingToCyclicSearch = cyclicSearchRequests.map(searchRequest =>
      this.findCyclicSearchByCyclicSearchRequest(searchRequest))
    const reqsBelongingToCyclicSearch = await Promise.all(pendingFindingReqsBelongingToCyclicSearch)
    const toDelete = reqsBelongingToCyclicSearch.filter(v => !v.found).map(v => v.searchRequest)
    if (toDelete.length) {
      const deletedCount = await this.searchRequestRepository.deleteMany(toDelete.map(v => v.searchId))
      toDelete.map(v => this.userNotificationSender.notifyAboutDeletedCyclicSearchRequest(v.searchId))
      toDelete.map(v => this.dataUpdateSender.notifyAboutDeletedSearchRequest(v.searchId, v.scenarioType))
      logger.info(`[${deletedCount}] cyclic search requests with ids [${toDelete}] were ` +
        `deleted due to not belonging to any search cycle`)
    }
  }

  private async findCyclicSearchByCyclicSearchRequest(searchRequest: SearchRequest): Promise<{
    found: boolean
    searchRequest: SearchRequest
  }> {
    const found = await this.cyclicSearchRepository.findByCyclicSearchRequest(searchRequest.searchId)
    return {
      found: !!found,
      searchRequest,
    }
  }
}
