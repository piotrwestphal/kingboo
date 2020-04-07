import { UserNotificationsSender } from '../core/abstract/user-notifications.sender';
import { RmqClientProxy } from '@kb/rabbit/rmq.client.proxy';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { UserNotification } from '@kb/model/mqmessage/user-notification';

export class RmqUserNotificationsSender extends UserNotificationsSender {

  constructor(
    private readonly client: RmqClientProxy<UserNotificationsMessagePattern, UserNotification>,
  ) {
    super();
  }

  notifyAboutCreatedSearchRequest(userId: string, searchId: string): void {
    this.client.emit(UserNotificationsMessagePattern.SEARCH_REQUEST_CREATED, { userId, searchId });
  }

  notifyAboutUpdatedSearchRequest(userId: string, searchId: string): void {
    this.client.emit(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED, { userId, searchId });
  }

  notifyAboutDeletedSearchRequest(userId: string, searchId: string): void {
    this.client.emit(UserNotificationsMessagePattern.SEARCH_REQUEST_DELETED, { userId, searchId });
  }
}
