import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedMessage } from '@kb/model/mqmessage/search-place-collection-completed.message';
import { SearchRequestService } from './search-request/search-request.service';

@Controller()
export class DataCollectionNotificationConsumer {

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.SEARCH_PLACE_COLLECTION_COMPLETED)
  async handleSearchPlaceCollectionCompleted(@Payload() { searchId, searchPlaceIdentifier }: SearchPlaceCollectionCompletedMessage) {
    await this.searchRequestService.updateSearchPlaceIdentifier(searchId, searchPlaceIdentifier);
  }
}
