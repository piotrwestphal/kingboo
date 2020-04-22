import { SearchRequestService } from '../core/abstract/search-request.service';
import { SearchRequestRepository } from '../core/abstract/search-request.repository';
import { SearchRequest } from '../core/model/SearchRequest';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { CollectingScenarioSender } from '../core/abstract/collecting-scenario.sender';
import { ConflictException, Injectable } from '@nestjs/common';
import { SearchRequestFactory } from './search-request.factory';
import { CreateSearchRequest } from '../core/interface/create-search-request';

@Injectable()
export class AppSearchRequestService extends SearchRequestService {

  constructor(
    private readonly collectingScenarioSender: CollectingScenarioSender,
    private readonly searchRequestFactory: SearchRequestFactory,
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly userNotificationsSender: UserNotificationSender,
  ) {
    super();
  }

  async createSearchRequest(userId: string, createSearchRequest: CreateSearchRequest): Promise<SearchRequest> {
    const created = this.searchRequestFactory.createNew(createSearchRequest);
    const found = await this.searchRequestRepository.findBySearchId(created.searchId);
    if (found) {
      throw new ConflictException(`Search request with given search id [${created.searchId}] already exist.`);
    }
    const saved = await this.searchRequestRepository.create(created);
    console.log(`Successfully created search request with search id [${saved.searchId}]`);
    this.collectingScenarioSender.sendScenario(saved);
    this.userNotificationsSender.notifyAboutCreatedSearchRequest(userId, saved.searchId);
    return saved;
  }

  async updateSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): Promise<void> {
    const found = await this.searchRequestRepository.findBySearchId(searchId);
    if (found) {
      const updated = found.updateSearchPlaceIdentifier(searchPlaceIdentifier);
      const saved = await this.searchRequestRepository.update(updated);
      console.log(`Successfully updated search place identifier [${saved.searchPlaceIdentifier}] for given search id [${searchId}]`);
      console.debug(`Updated search request: [${JSON.stringify(saved)}]`);
    } else {
      console.warn(`Unable to update search place identifier. Search request for given search id [${searchId}] not found`);
    }
  }

  async unblockRequest(searchId: string): Promise<void> {
    const found = await this.searchRequestRepository.findBySearchId(searchId);
    if (found) {
      const unblocked = found.unblock();
      await this.searchRequestRepository.update(unblocked);
      console.debug(`Successfully unblock search request for given search id [${searchId}]`);
    } else {
      console.warn(`Unable to unblock. Search request for given search id [${searchId}] not found`);
    }
  }
}
