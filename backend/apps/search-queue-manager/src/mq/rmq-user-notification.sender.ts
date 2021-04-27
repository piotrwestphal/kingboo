import { UserNotificationSender } from '../core/abstract/user-notification.sender'
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern'
import { ClientProxy } from '@nestjs/microservices'
import { MqMessage, SearchRequestDto } from '@kb/model'

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super()
  }

  notifyAboutCreatedUserSearchRequest(searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<SearchRequestDto>>(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED,
      { data: dto, searchId, timestamp: Date.now() })
  }

  notifyAboutCollectedSearchIdentifier(searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<SearchRequestDto>>(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED,
      { data: dto, searchId, timestamp: Date.now() })
  }

  notifyAboutCreatedCyclicSearchRequest(searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<SearchRequestDto>>(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED,
      { data: dto, searchId, timestamp: Date.now() })
  }

  notifyAboutFinishedCollecting(searchId: string, dto: SearchRequestDto): void {
    this.client.emit<void, MqMessage<SearchRequestDto>>(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED,
      { data: dto, searchId, timestamp: Date.now() })
  }

  notifyAboutDeletedCyclicSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.SEARCH_REQUEST_DELETED,
      { searchId, timestamp: Date.now() })
  }
}
