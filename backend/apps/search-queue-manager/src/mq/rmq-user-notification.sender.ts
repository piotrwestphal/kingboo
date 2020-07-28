import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { UserNotificationMessage } from '@kb/model/mqmessage/user-notification.message';
import { ClientProxy } from '@nestjs/microservices';
import { UserData } from '@kb/model';

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutCreatedSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage<UserData>>(UserNotificationsMessagePattern.SEARCH_REQUEST_CREATED,
      { data: {userId}, searchId, timestamp: Date.now() });
  }

  notifyAboutUpdatedSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage<UserData>>(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED,
      { data: {userId}, searchId, timestamp: Date.now() });
  }

  notifyAboutDeletedSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage<UserData>>(UserNotificationsMessagePattern.SEARCH_REQUEST_DELETED,
      { data: {userId}, searchId, timestamp: Date.now() });
  }
}
