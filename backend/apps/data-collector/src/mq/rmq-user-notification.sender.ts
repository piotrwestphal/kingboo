import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { UserNotificationMessage } from '@kb/model/mqmessage/user-notification.message';
import { ClientProxy } from '@nestjs/microservices';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { ScrapData } from '@kb/model/mqmessage/user-notification/scrap.data';

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutHotelsCollectionStarted(searchId: string, scrapStartedAt: Date, scrapFinishedAt: Date): void {
    this.client.emit<void, UserNotificationMessage<ScrapData>>(UserNotificationsMessagePattern.HOTELS_COLLECTION_STARTED,
      { searchId, data: this.convertToStringDate(scrapStartedAt, scrapFinishedAt), timestamp: Date.now() });
  }

  notifyAboutHotelsCollectionCompleted(searchId: string, scrapStartedAt: Date, scrapFinishedAt: Date): void {
    this.client.emit<void, UserNotificationMessage<ScrapData>>(UserNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED,
      { searchId, data: this.convertToStringDate(scrapStartedAt, scrapFinishedAt), timestamp: Date.now() });
  }

  private convertToStringDate(scrapStartedAt: Date, scrapFinishedAt: Date): ScrapData {
    return {
      scrapStartedAt: scrapStartedAt ? scrapStartedAt.toISOString() : null,
      scrapFinishedAt: scrapFinishedAt ? scrapFinishedAt.toISOString() : null,
    }
  }
}
