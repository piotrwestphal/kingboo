import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedDto } from '@kb/model/mqmessage/data-collection-notification/search-place-collection-completed.dto';
import { SearchRequestService } from './search-request/search-request.service';
import { MqMessage, ScrapingFinishedDto } from '@kb/model';

@Controller()
export class DataCollectionNotificationConsumer {

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.SEARCH_PLACE_COLLECTION_COMPLETED)
  async handleSearchPlaceCollectionCompleted(
    @Payload() { searchId, data: { searchPlaceIdentifier } }: MqMessage<SearchPlaceCollectionCompletedDto>): Promise<void> {
    await this.searchRequestService.updateSearchPlaceIdentifier(searchId, searchPlaceIdentifier);
  }

  @MessagePattern(DataCollectionNotificationsMessagePattern.DATA_COLLECTION_FINISHED)
  async handleDataCollectionFinished(
    @Payload() { searchId, data: { scrapingStartedAt, scrapingFinishedAt } }: MqMessage<ScrapingFinishedDto>): Promise<void> {
    await this.searchRequestService.updateCollectingProgress(searchId, scrapingStartedAt, scrapingFinishedAt);
  }
}
