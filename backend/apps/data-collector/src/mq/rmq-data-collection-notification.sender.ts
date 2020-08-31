import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { SearchPlaceCollectionCompletedMessage } from '@kb/model/mqmessage/search-place-collection-completed.message';
import { ClientProxy } from '@nestjs/microservices';
import { ScrapingProgressMessage } from '@kb/model';

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

  notifyAboutHotelsCollectionStarted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void {
    const msg = this.convertToProgressMsg(searchId, scrapingStartedAt, scrapingFinishedAt)
    this.client.emit<void, ScrapingProgressMessage>(DataCollectionNotificationsMessagePattern.DATA_COLLECTION_PROGRESS, msg);
  }

  notifyAboutHotelsCollectionCompleted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void {
    const msg = this.convertToProgressMsg(searchId, scrapingStartedAt, scrapingFinishedAt)
    this.client.emit<void, ScrapingProgressMessage>(DataCollectionNotificationsMessagePattern.DATA_COLLECTION_PROGRESS, msg);
  }

  private convertToProgressMsg(searchId: string,
                               scrapingStartedAt: Date,
                               scrapingFinishedAt: Date): ScrapingProgressMessage {
    return {
      searchId,
      scrapingStartedAt: scrapingStartedAt ? scrapingStartedAt.toISOString() : null,
      scrapingFinishedAt: scrapingFinishedAt ? scrapingFinishedAt.toISOString() : null,
      timestamp: Date.now(),
    }
  }
}
