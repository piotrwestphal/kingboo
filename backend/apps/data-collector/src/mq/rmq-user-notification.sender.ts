import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { ClientProxy } from '@nestjs/microservices';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { MqMessage } from '@kb/model';

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutHotelsCollectionStarted(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.HOTELS_COLLECTION_STARTED,
      { searchId, timestamp: Date.now() });
  }
}
