import { UserNotificationsSender } from '../core/abstract/user-notifications.sender';
import { RmqClientProxy } from '@kb/rabbit/rmq.client.proxy';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';

export class RmqUserNotificationsSender extends UserNotificationsSender {

  constructor(
    private readonly client: RmqClientProxy<UserNotificationsMessagePattern, any>,
  ) {
    super();
  }

  notifyAboutCreatedSearchRequest(payload): void {
    this.client.emit(UserNotificationsMessagePattern.SEARCH_REQUEST_CREATED, payload);
  }

  notifyAboutUpdatedSearchRequest(payload): void {
    this.client.emit(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED, payload);
  }

  notifyAboutDeletedSearchRequest(payload): void {
    this.client.emit(UserNotificationsMessagePattern.SEARCH_REQUEST_DELETED, payload);
  }
}

ł;
