import { UserNotificationSender } from '../core/abstract/user-notification.sender'
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern'
import { ClientProxy } from '@nestjs/microservices'
import { MqMessage, SearchRequestDto, UserSearchRequestDto } from '@kb/model'

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super()
  }

  notifyAboutCreatedUserSearchRequest(userId: string, searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<UserSearchRequestDto>>(UserNotificationsMessagePattern.SEARCH_REQUEST_CREATED,
      { data: { userId, dto }, searchId, timestamp: Date.now() })
  }

  notifyAboutCreatedCyclicSearchRequest(searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<SearchRequestDto>>(UserNotificationsMessagePattern.CYCLIC_SEARCH_REQUEST_CREATED,
      { data: dto, searchId, timestamp: Date.now() })
  }

  notifyAboutDeletedCyclicSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.CYCLIC_SEARCH_REQUEST_DELETED,
      { searchId, timestamp: Date.now() })
  }

  notifyAboutFinishedCollecting(searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<SearchRequestDto>>(UserNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED,
      { data: dto, searchId, timestamp: Date.now() })
  }
}
