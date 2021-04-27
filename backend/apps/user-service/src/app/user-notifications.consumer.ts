import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern'
import { MqMessage, SearchRequestDto } from '@kb/model'
import { logger } from '../logger'
import { mqAck } from '@kb/rabbit'
import { UserNotificationHandler } from './user-notification.handler'

@Controller()
export class UserNotificationsConsumer {

  constructor(
    private readonly userNotificationHandler: UserNotificationHandler
  ) {
  }

  @MessagePattern(UserNotificationsMessagePattern.SEARCH_REQUEST_UPDATED)
  async handleSearchRequestUpdated(@Payload() { searchId, data }: MqMessage<SearchRequestDto>,
                                   @Ctx() ctx: RmqContext): Promise<void> {
    logger.debug(`Receive ${ctx.getPattern()} message with search id [${searchId}] and payload`, data)
    await this.userNotificationHandler.updateSearchRequest(searchId, data)
    mqAck(ctx)
  }

  @MessagePattern(UserNotificationsMessagePattern.SEARCH_REQUEST_DELETED)
  async handleSearchRequestDeleted(@Payload() { searchId }: MqMessage,
                                   @Ctx() ctx: RmqContext): Promise<void> {
    logger.debug(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.userNotificationHandler.deleteSearchRequest(searchId)
    mqAck(ctx)
  }

  @MessagePattern(UserNotificationsMessagePattern.TOP_HOTELS_UPDATED)
  async handleTopHotelsUpdated(@Payload() { searchId }: MqMessage,
                               @Ctx() ctx: RmqContext): Promise<void> {
    logger.debug(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.userNotificationHandler.updateTopHotels(searchId)
    mqAck(ctx)
  }
}
