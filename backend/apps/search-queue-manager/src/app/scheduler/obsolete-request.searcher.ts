import { SearchRequestRepository } from '../../core/abstract/search-request.repository'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { logger } from '../../logger'
import { UserNotificationSender } from '../../core/abstract/user-notification.sender'
import { DataUpdateSender } from '../../core/abstract/data-update.sender'

@Injectable()
export class ObsoleteRequestSearcher {

  constructor(
    private readonly dataUpdateSender: DataUpdateSender,
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly userNotificationSender: UserNotificationSender,
  ) {
  }

  @Cron(CronExpression.EVERY_5_MINUTES, {
    name: 'find-obsolete-cyclic-search-requests',
  })
  async findObsoleteCyclicSearchRequests() {
    logger.debug(`Triggering job [find-obsolete-cyclic-search-requests]`)
    const now = new Date()
    const found = await this.searchRequestRepository.findObsoleteCyclicRequests(now)
    if (found.length) {
      const searchIds = found.map(v => v.searchId)
      const deletedCount = await this.searchRequestRepository.deleteMany(searchIds)
      searchIds.map(v => this.userNotificationSender.notifyAboutDeletedCyclicSearchRequest(v))
      found.map(v => this.dataUpdateSender.notifyAboutDeletedSearchRequest(v.searchId, v.scenarioType))
      logger.info(`[${deletedCount}] cyclic search requests with ids [${searchIds}] were deleted due to obsolescence`)
    }
  }
}
