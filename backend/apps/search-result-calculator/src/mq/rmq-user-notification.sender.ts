import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { ClientProxy } from '@nestjs/microservices';
import { HotelsData, UserNotificationMessage } from '@kb/model';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';

export class RmqUserNotificationSender extends UserNotificationSender {
  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  notifyAboutHotelsProcessingFinished(searchId: string,
                                      processedHotelIds: string[],
                                      processingTimeMs: number,
                                      collectedAt: string): void {
    this.client.emit<void, UserNotificationMessage<HotelsData>>(UserNotificationsMessagePattern.HOTELS_PROCESSING_COMPLETED,
      { data: { processedHotelIds, processingTimeMs, collectedAt }, searchId, timestamp: Date.now() })
  }
}
