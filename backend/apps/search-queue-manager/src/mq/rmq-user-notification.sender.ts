import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { UserNotificationMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationMessagePattern';
import { ClientProxy } from '@nestjs/microservices';
import { MqMessage, UserDto } from '@kb/model';
import { CollectingTimesDto } from '@kb/model/mqmessage/user-notification/collecting-times.dto';

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutCreatedUserSearchRequest(userId: string, searchId: string): void {
    this.client.emit<void, MqMessage<UserDto>>(UserNotificationMessagePattern.USER_SEARCH_REQUEST_CREATED,
      { data: { userId }, searchId, timestamp: Date.now() });
  }

  notifyAboutCreatedCyclicSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationMessagePattern.CYCLIC_SEARCH_REQUEST_CREATED,
      { searchId, timestamp: Date.now() });
  }

  notifyAboutDeletedCyclicSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationMessagePattern.CYCLIC_SEARCH_REQUEST_DELETED,
      { searchId, timestamp: Date.now() });
  }

  notifyAboutFinishedCollecting(searchId: string,
                                collectingStartedAt: string,
                                collectingFinishedAt: string): void {
    this.client.emit<void, MqMessage<CollectingTimesDto>>(UserNotificationMessagePattern.HOTELS_COLLECTION_COMPLETED,
      { data: { collectingStartedAt, collectingFinishedAt }, searchId, timestamp: Date.now() });
  }
}
