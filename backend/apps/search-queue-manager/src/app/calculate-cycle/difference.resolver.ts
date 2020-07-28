import { SearchRequest } from '../../core/model/SearchRequest';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { logger } from '../../logger';
import { ConflictException } from '@nestjs/common';
import { SearchRequestService } from '../search-request/search-request.service';
import { UserNotificationSender } from '../../core/abstract/user-notification.sender';

export class DifferenceResolver {

  constructor(
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly searchRequestService: SearchRequestService,
    private readonly userNotificationsSender: UserNotificationSender,
  ) {
  }

  async resolveDifferences(currentSearchRequests: SearchRequest[],
                           searchIdsToCreate: string[],
                           searchIdsToDelete: string[]): Promise<void> {
    const searchRequestsToCreate = currentSearchRequests.filter(v => searchIdsToCreate.includes(v.searchId));
    const dbOperations: Array<() => Promise<void>> = [];

    if (searchRequestsToCreate.length) {
      dbOperations.push(() => this.create(searchRequestsToCreate));
    }
    if (searchIdsToDelete.length) {
      dbOperations.push(() => this.delete(searchIdsToDelete));
    }

    await Promise.all(dbOperations.map(v => v()));
  }

  private async delete(searchIds: string[]): Promise<void> {
    const deletedCount = await this.searchRequestRepository.deleteMany(searchIds);
    if (deletedCount) {
      logger.info(`[${deletedCount}] search requests were deleted`);
      logger.debug(`Deleted requests search ids:`, searchIds);
      searchIds.map(v => this.userNotificationsSender.notifyAboutDeletedCyclicSearchRequest(v));
    }
  }

  private async create(searchRequests: SearchRequest[]): Promise<void> {
    logger.info(`Trying to create [${searchRequests.length}] search requests`);
    const created = await Promise.all(searchRequests.map(async searchRequest => {
      try {
        return await this.searchRequestService.saveSearchRequest(searchRequest);
      } catch (err) {
        if (err instanceof ConflictException) {
          logger.warn('Cyclic search request for given parameters already exist. Given parameters', searchRequest);
        } else {
          logger.error('Cannot create cyclic search request', err);
        }
      }
    }));
    const searchIds = created.filter(Boolean).map(v => v.searchId);
    logger.info(`[${searchIds.length}] of [${searchRequests.length}] search requests were created`);
    searchIds.map(v => this.userNotificationsSender.notifyAboutCreatedCyclicSearchRequest(v));
    logger.debug(`Search ids of created search requests`, searchIds);
  }
}
