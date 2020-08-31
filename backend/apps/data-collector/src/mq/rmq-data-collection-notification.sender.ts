import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedMessage } from '@kb/model/mqmessage/search-place-collection-completed.message';
import { ClientProxy } from '@nestjs/microservices';
import { ScrapingFinishedMessage } from '@kb/model';

export class RmqDataCollectionNotificationSender extends DataCollectionNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): void {
    this.client.emit<void, SearchPlaceCollectionCompletedMessage>(
      DataCollectionNotificationsMessagePattern.SEARCH_PLACE_COLLECTION_COMPLETED,
      { searchPlaceIdentifier, searchId, timestamp: Date.now() });
  }

  notifyAboutHotelsCollectionCompleted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void {
    const msg: ScrapingFinishedMessage = {
      searchId,
      scrapingStartedAt: scrapingStartedAt.toISOString(),
      scrapingFinishedAt: scrapingFinishedAt.toISOString(),
      timestamp: Date.now(),
    }
    this.client.emit<void, ScrapingFinishedMessage>(DataCollectionNotificationsMessagePattern.DATA_COLLECTION_FINISHED, msg);
  }
}
