import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { SearchRequest } from '../../core/model/SearchRequest';
import { UserNotificationSender } from '../../core/abstract/user-notification.sender';
import { CollectingScenarioSender } from '../../core/abstract/collecting-scenario.sender';
import { ConflictException } from '@nestjs/common';
import { SearchRequestFactory } from './search-request.factory';
import { CreateSearchRequest } from './create-search-request';
import { logger } from '../../logger';
import { SearchRequestType } from '../../core/model/SearchRequestType';
import { SearchRequestMapper } from './search-request.mapper';
import { SearchRequestDto, SearchRequestsDto } from '@kb/model';

export class SearchRequestService {

  constructor(
    private readonly collectingScenarioSender: CollectingScenarioSender,
    private readonly searchRequestFactory: SearchRequestFactory,
    private readonly searchRequestMapper: SearchRequestMapper,
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly userNotificationsSender: UserNotificationSender,
  ) {
  }

  async findAll(): Promise<SearchRequestsDto> {
    const found = await this.searchRequestRepository.findAll();
    return {
      searchRequests: found.map((sr) => this.searchRequestMapper.toDto(sr)),
    }
  }

  async findOrFail(searchId: string): Promise<SearchRequestDto> {
    const found = await this.searchRequestRepository.findBySearchIdOrFail(searchId);
    return this.searchRequestMapper.toDto(found);
  }

  async createUserSearchRequest(userId: string, createSearchRequest: CreateSearchRequest): Promise<SearchRequestDto> {
    const searchRequest = this.searchRequestFactory.createNew(SearchRequestType.USER, createSearchRequest);
    const saved = await this.saveSearchRequest(searchRequest);
    this.userNotificationsSender.notifyAboutCreatedUserSearchRequest(userId, saved.searchId);
    return this.searchRequestMapper.toDto(saved);
  }

  buildCyclicSearchRequest(createSearchRequest: CreateSearchRequest): SearchRequest {
    return this.searchRequestFactory.createNew(SearchRequestType.CYCLIC, createSearchRequest);
  }

  async updateSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): Promise<void> {
    const found = await this.searchRequestRepository.findBySearchId(searchId);
    if (found) {
      const updated = found.updateSearchPlaceIdentifier(searchPlaceIdentifier);
      const saved = await this.searchRequestRepository.update(updated);
      logger.info(`Successfully updated search place identifier [${saved.searchPlaceIdentifier}] for given search id [${searchId}]`);
      logger.debug(`Updated search request`, saved);
    } else {
      logger.warn(`Unable to update search place identifier. Search request for given search id [${searchId}] not found`);
    }
  }

  async updateCollectingProgress(searchId: string,
                                 collectingStartedAt: string,
                                 collectingFinishedAt: string): Promise<void> {
    const found = await this.searchRequestRepository.findBySearchId(searchId);
    if (found) {
      const updated = found.finishCollecting(collectingStartedAt, collectingFinishedAt);
      const saved = await this.searchRequestRepository.update(updated);
      logger.info(`Successfully updated collecting progress for search request with id [${searchId}], ` +
        `started at [${collectingStartedAt}] finished at [${collectingFinishedAt}]`);
      logger.debug(`Updated search request`, saved);
      this.userNotificationsSender.notifyAboutFinishedCollecting(searchId, collectingStartedAt, collectingFinishedAt);
    } else {
      logger.warn(`Unable to update collecting progress. Search request for given search id [${searchId}] not found`);
    }
  }

  async saveSearchRequest(searchRequest: SearchRequest): Promise<SearchRequest> {
    const found = await this.searchRequestRepository.findBySearchId(searchRequest.searchId);
    if (found) {
      throw new ConflictException(`Search request with given search id [${searchRequest.searchId}] already exist.`);
    }
    const saved = await this.searchRequestRepository.create(searchRequest);
    logger.info(`Successfully created search request with search id [${saved.searchId}]`);
    return saved;
  }
}
