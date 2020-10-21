import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserNotificationMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationMessagePattern';
import { MqMessage } from '@kb/model';
import { logger } from '../logger';
import { UserNotificationHandler } from '../core/abstract/user-notification.handler';
import { CollectingTimesDto } from '@kb/model/mqmessage/user-notification/collecting-times.dto';
import { mqAck } from '@kb/rabbit';

@Controller()
export class ProcessedDataMessageConsumer {

  constructor(
    private readonly userNotificationHandler: UserNotificationHandler
  ) {
  }

  // TODO: is CollectingTimesData needed?
  @MessagePattern(UserNotificationMessagePattern.HOTELS_COLLECTION_COMPLETED)
  async handleHotelsCollectionCompleted(@Payload() { searchId, timestamp, data }: MqMessage<CollectingTimesDto>,
                                        @Ctx() ctx: RmqContext): Promise<void> {
    logger.debug(`Received message ${UserNotificationMessagePattern.HOTELS_COLLECTION_COMPLETED} for [${searchId}]`, data)
    await this.userNotificationHandler.updateSearchRequestCache(searchId, data, timestamp)
    mqAck(ctx);
  }
}
