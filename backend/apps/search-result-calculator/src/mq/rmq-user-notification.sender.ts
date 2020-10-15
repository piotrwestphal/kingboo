import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { ClientProxy } from '@nestjs/microservices';
import { MqMessage } from '@kb/model';
import { UserNotificationMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationMessagePattern';

export class RmqUserNotificationSender extends UserNotificationSender {
  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutHotelsProcessingFinished(searchId: string): void {
    this.client.emit<void, MqMessage>(UserNotificationMessagePattern.HOTELS_PROCESSING_COMPLETED,{ searchId, timestamp: Date.now() })
  }
}
