import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserNotificationMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationMessagePattern';
import { MqMessage, UserDto } from '@kb/model';
import { logger } from '../logger';
import { UserNotificationHandler } from '../core/abstract/user-notification.handler';
import { CollectingTimesDto } from '@kb/model/mqmessage/user-notification/collecting-times.dto';
import { mqAck } from '@kb/rabbit';

@Controller()
export class SearchRequestMessageConsumer {

  constructor(
    private readonly userNotificationHandler: UserNotificationHandler
  ) {
  }

  // TODO: is CollectingTimesData needed?
  @MessagePattern(UserNotificationMessagePattern.HOTELS_COLLECTION_COMPLETED)
  async handleHotelsCollectionCompleted(@Payload() { searchId, timestamp, data }: MqMessage<CollectingTimesDto>,
                                        @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`, data);
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx);
  }

  @MessagePattern(UserNotificationMessagePattern.USER_SEARCH_REQUEST_CREATED)
  async handleSearchRequestCreated(@Payload() { searchId, timestamp, data }: MqMessage<UserDto>,
                                   @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`, data);
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx);
  }

  @MessagePattern(UserNotificationMessagePattern.CYCLIC_SEARCH_REQUEST_CREATED)
  async handleCyclicSearchRequestCreated(@Payload() { searchId, timestamp, }: MqMessage,
                                         @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`);
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx);
  }

  @MessagePattern(UserNotificationMessagePattern.CYCLIC_SEARCH_REQUEST_DELETED)
  async handleCyclicSearchRequestDeleted(@Payload() { searchId, timestamp, }: MqMessage,
                                         @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`);
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx);
  }
}
