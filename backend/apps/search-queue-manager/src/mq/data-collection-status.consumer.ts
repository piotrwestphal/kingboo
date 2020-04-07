import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedMsg } from '@kb/model/mqmessage/search-place-collection-completed-msg';
import { HotelsCollectionCompletedMsg } from '@kb/model/mqmessage/hotels-collection-completed-msg';
import { SearchRequestService } from '../core/abstract/search-request.service';

@Controller()
export class DataCollectionStatusConsumer {

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED)
  async handleHotelsCollectionCompleted(@Payload() { searchId }: HotelsCollectionCompletedMsg) {
    await this.searchRequestService.unblockRequest(searchId);
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.SEARCH_PLACE_COLLECTION_COMPLETED)
  async handleSearchPlaceCollectionCompleted(@Payload() { searchId, searchPlaceIdentifier }: SearchPlaceCollectionCompletedMsg) {
    await this.searchRequestService.updateSearchPlaceIdentifier(searchId, searchPlaceIdentifier);
  }
}
