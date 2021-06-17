import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern'
import { ClientProxy } from '@nestjs/microservices'
import { MqMessage } from '@kb/model'
import { UserNotificationSender } from '../core/abstract/user-notification.sender'

export class RmqUserNotificationSender extends UserNotificationSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super()
  }

  notifyAboutTopHotelsUpdate(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.TOP_HOTELS_UPDATED,
      { searchId, timestamp: Date.now() })
  }

  notifyAboutPlaceUpdate(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationsMessagePattern.PLACE_UPDATED,
      { searchId, timestamp: Date.now() })
  }
}
