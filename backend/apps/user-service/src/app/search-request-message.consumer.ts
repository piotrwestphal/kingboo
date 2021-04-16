import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern'
import { MqMessage, SearchRequestDto, UserSearchRequestDto } from '@kb/model'
import { logger } from '../logger'
import { UserNotificationHandler } from '../core/abstract/user-notification.handler'
import { mqAck } from '@kb/rabbit'

@Controller()
export class SearchRequestMessageConsumer {

  constructor(
    private readonly userNotificationHandler: UserNotificationHandler
  ) {
  }

  // TODO: is CollectingTimesData needed?
  @MessagePattern(UserNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED)
  async handleHotelsCollectionCompleted(@Payload() { searchId, timestamp, data }: MqMessage<SearchRequestDto>,
                                        @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`, data)
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx)
  }

  @MessagePattern(UserNotificationsMessagePattern.SEARCH_REQUEST_CREATED)
  async handleSearchRequestCreated(@Payload() { searchId, timestamp, data }: MqMessage<UserSearchRequestDto>,
                                   @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`, data)
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx)
  }

  @MessagePattern(UserNotificationsMessagePattern.CYCLIC_SEARCH_REQUEST_CREATED)
  async handleCyclicSearchRequestCreated(@Payload() { searchId, timestamp, }: MqMessage<SearchRequestDto>,
                                         @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx)
  }

  @MessagePattern(UserNotificationsMessagePattern.CYCLIC_SEARCH_REQUEST_DELETED)
  async handleCyclicSearchRequestDeleted(@Payload() { searchId, timestamp, }: MqMessage,
                                         @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.userNotificationHandler.updateSearchRequestCache(searchId, timestamp)
    mqAck(ctx)
  }
}
