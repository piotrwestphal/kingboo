import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserNotificationMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationMessagePattern';
import { MqMessage } from '@kb/model';
import { logger } from '../logger';
import { UserNotificationHandler } from '../core/abstract/user-notification.handler';
import { CollectingTimesDto } from '@kb/model/mqmessage/user-notification/collecting-times.dto';

@Controller()
export class UserNotificationConsumer {

  constructor(
    private readonly userNotificationHandler: UserNotificationHandler
  ) {
  }

  // TODO: updatedAt > timestamp to nie aktualizuj
  // TODO: prefetch count 1
  // TODO: is CollectingTimesData needed?
  @MessagePattern(UserNotificationMessagePattern.HOTELS_COLLECTION_COMPLETED)
  async handleHotelsCollectionCompleted(@Payload() { searchId, timestamp, data }: MqMessage<CollectingTimesDto>,
                                        @Ctx() context: RmqContext): Promise<void> {
    logger.debug(`Received message ${UserNotificationMessagePattern.HOTELS_COLLECTION_COMPLETED} for [${searchId}]`, data)
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    this.ack(context);
  }

  // TODO: updatedAt > timestamp to nie aktualizuj
  // TODO: is collectedAt needed?
  // TODO: chyba bez sensu!!
  // TODO: this message should come from search-queue-manage
  // TODO: send update to user only when search-reqs and hotels are sync
  @MessagePattern(UserNotificationMessagePattern.HOTELS_PROCESSING_COMPLETED)
  async handleHotelsProcessingCompleted(@Payload() { searchId, timestamp }: MqMessage,
                                        @Ctx() context: RmqContext): Promise<void> {
    logger.debug(`Received message ${UserNotificationMessagePattern.HOTELS_PROCESSING_COMPLETED} for [${searchId}]`)
    await this.userNotificationHandler.updateTopHotelsCache(searchId, timestamp)
    this.ack(context);

  }

  private ack = (context: RmqContext) => {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
