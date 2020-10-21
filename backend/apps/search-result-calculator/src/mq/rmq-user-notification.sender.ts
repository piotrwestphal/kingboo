import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { ClientProxy } from '@nestjs/microservices';
import { CollectingTimesDto, MqMessage } from '@kb/model';
import { UserNotificationMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationMessagePattern';

export class RmqUserNotificationSender extends UserNotificationSender {
  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutHotelsProcessingFinished(searchId: string,
                                      collectingStartedAt: string,
                                      collectingFinishedAt: string): void {
    this.client.emit<void, MqMessage<CollectingTimesDto>>(UserNotificationMessagePattern.HOTELS_PROCESSING_COMPLETED, {
      searchId,
      timestamp: Date.now(),
      data: {
        collectingStartedAt,
        collectingFinishedAt,
      }
    })
  }
}
