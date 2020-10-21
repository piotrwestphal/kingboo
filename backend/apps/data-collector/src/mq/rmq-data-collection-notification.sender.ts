import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedDto } from '@kb/model/mqmessage/data-collection-notification/search-place-collection-completed.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MqMessage, CollectingTimesDto } from '@kb/model';

export class RmqDataCollectionNotificationSender extends DataCollectionNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): void {
    this.client.emit<void, MqMessage<SearchPlaceCollectionCompletedDto>>(
      DataCollectionNotificationsMessagePattern.SEARCH_PLACE_COLLECTION_COMPLETED,
      { searchId, timestamp: Date.now(), data: {searchPlaceIdentifier} });
  }

  notifyAboutHotelsCollectionCompleted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void {
    this.client.emit<void, MqMessage<CollectingTimesDto>>(
      DataCollectionNotificationsMessagePattern.DATA_COLLECTION_FINISHED,
      {
        searchId,
        timestamp: Date.now(),
        data: {
          collectingStartedAt: scrapingStartedAt.toISOString(),
          collectingFinishedAt: scrapingFinishedAt.toISOString(),
        }
      });
  }
}
