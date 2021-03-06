import { SearchRequest } from '../../core/model/SearchRequest'
import { SearchRequestRepository } from '../../core/abstract/search-request.repository'
import { logger } from '../../logger'
import { ConflictException } from '@nestjs/common'
import { SearchRequestService } from '../search-request/search-request.service'
import { UserNotificationSender } from '../../core/abstract/user-notification.sender'
import { SearchRequestMapper } from '../search-request/search-request.mapper'
import { DataUpdateSender } from '../../core/abstract/data-update.sender'

export class DifferenceResolver {

  constructor(
    private readonly dataUpdateSender: DataUpdateSender,
    private readonly userNotificationSender: UserNotificationSender,
    private readonly searchRequestMapper: SearchRequestMapper,
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  async resolveDifferences(searchRequestsToCreate: SearchRequest[],
                           searchRequestsToDelete: SearchRequest[]): Promise<void> {
    const dbOperations: Array<() => Promise<void>> = []
    if (searchRequestsToCreate.length) {
      dbOperations.push(() => this.create(searchRequestsToCreate))
    }
    if (searchRequestsToDelete.length) {
      dbOperations.push(() => this.delete(searchRequestsToDelete))
    }
    await Promise.all(dbOperations.map(v => v()))
  }

  private async delete(searchRequests: SearchRequest[]): Promise<void> {
    const searchIdsToDelete = searchRequests.map(v => v.searchId)
    const deletedCount = await this.searchRequestRepository.deleteMany(searchIdsToDelete)
    if (deletedCount) {
      logger.info(`[${deletedCount}] search requests were deleted`)
      logger.debug(`Deleted requests search ids:`, searchIdsToDelete)
      searchIdsToDelete.map(v => this.userNotificationSender.notifyAboutDeletedCyclicSearchRequest(v))
      searchRequests.map(v => this.dataUpdateSender.notifyAboutDeletedSearchRequest(v.searchId, v.scenarioType))
    }
  }

  private async create(searchRequests: SearchRequest[]): Promise<void> {
    logger.info(`Trying to create [${searchRequests.length}] search requests`)
    const created = await Promise.all(searchRequests.map(async searchRequest => {
      try {
        return await this.searchRequestService.saveSearchRequest(searchRequest)
      } catch (err) {
        if (err instanceof ConflictException) {
          logger.warn('Cyclic search request for given parameters already exist. Given parameters', searchRequest)
        } else {
          logger.error('Cannot create cyclic search request', err)
        }
      }
    }))
    const searchRequestsDtos = created.filter(Boolean).map(v => this.searchRequestMapper.toDto(v))
    const searchIds = searchRequestsDtos.map(v => v.searchId)
    logger.info(`[${searchIds.length}] of [${searchRequests.length}] search requests were created`)
    searchRequestsDtos.map(v => this.userNotificationSender.notifyAboutCreatedCyclicSearchRequest(v.searchId, v))
    logger.debug(`Search ids of created search requests`, searchIds)
  }
}
