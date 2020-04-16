import { UserNotificationsSender } from '../core/abstract/user-notifications.sender';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { UserNotificationMessage } from '@kb/model/mqmessage/user-notification.message';
import { ClientProxy } from '@nestjs/microservices';

export class RmqUserNotificationsSender extends UserNotificationsSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutCreatedSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage>(UserNotificationsMessagePattern.SEARCH_REQUEST_CREATED,
      { userId, searchId, timestamp: Date.now() });
  }

  notifyAboutUpdatedSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage>(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED,
      { userId, searchId, timestamp: Date.now() });
  }

  notifyAboutDeletedSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage>(UserNotificationsMessagePattern.SEARCH_REQUEST_DELETED,
      { userId, searchId, timestamp: Date.now() });
  }
}
