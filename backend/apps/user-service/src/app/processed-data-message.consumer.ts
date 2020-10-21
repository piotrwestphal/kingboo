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

  @MessagePattern(UserNotificationMessagePattern.HOTELS_PROCESSING_COMPLETED)
  async handleHotelsProcessingCompleted(@Payload() { searchId, timestamp, data }: MqMessage<CollectingTimesDto>,
                                        @Ctx() ctx: RmqContext): Promise<void> {
    logger.debug(`Received message ${UserNotificationMessagePattern.HOTELS_PROCESSING_COMPLETED} for [${searchId}]`)
    await this.userNotificationHandler.updateTopHotelsCache(searchId, data, timestamp)
    mqAck(ctx);
  }
}
