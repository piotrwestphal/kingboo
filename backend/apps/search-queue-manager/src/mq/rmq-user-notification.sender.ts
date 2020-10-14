import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { UserNotificationMessage } from '@kb/model/mqmessage/user-notification.message';
import { ClientProxy } from '@nestjs/microservices';
import { MqMessage, UserData } from '@kb/model';
import { CollectingTimesData } from '@kb/model/mqmessage/user-notification/collecting-times.data';

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutCreatedUserSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, UserNotificationMessage<UserData>>(UserNotificationsMessagePattern.USER_SEARCH_REQUEST_CREATED,
      { data: { userId }, searchId, timestamp: Date.now() });
  }

  notifyAboutCreatedCyclicSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.CYCLIC_SEARCH_REQUEST_CREATED,
      { searchId, timestamp: Date.now() });
  }

  notifyAboutDeletedCyclicSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.CYCLIC_SEARCH_REQUEST_DELETED,
      { searchId, timestamp: Date.now() });
  }

  notifyAboutFinishedCollecting(searchId: string,
                                collectingStartedAt: string,
                                collectingFinishedAt: string): void {
    this.client.emit<void, UserNotificationMessage<CollectingTimesData>>(UserNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED,
      { data: { collectingStartedAt, collectingFinishedAt }, searchId, timestamp: Date.now() });
  }
}
