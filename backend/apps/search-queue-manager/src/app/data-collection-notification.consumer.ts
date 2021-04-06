import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedDto } from '@kb/model/mqmessage/data-collection-notification/search-place-collection-completed.dto';
import { SearchRequestService } from './search-request/search-request.service';
import { CollectingTimesDto, MqMessage } from '@kb/model';

@Controller()
export class DataCollectionNotificationConsumer {

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.SEARCH_PLACE_COLLECTION_COMPLETED)
  async handleSearchPlaceCollectionCompleted(
    @Payload() { searchId, data }: MqMessage<SearchPlaceCollectionCompletedDto>): Promise<void> {
    await this.searchRequestService.updateSearchPlaceIdentifier(searchId, data);
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.DATA_COLLECTION_FINISHED)
  async handleDataCollectionFinished(
    @Payload() { searchId, data: { collectingStartedAt, collectingFinishedAt } }: MqMessage<CollectingTimesDto>): Promise<void> {
    await this.searchRequestService.updateCollectingProgress(searchId, collectingStartedAt, collectingFinishedAt);
  }
}
