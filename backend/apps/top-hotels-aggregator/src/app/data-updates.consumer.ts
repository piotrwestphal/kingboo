import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CollectingTimesDto, MqMessage } from '@kb/model'
import { DataUpdatesMessagePattern, mqAck } from '@kb/rabbit'
import { TopHotelsService } from './top-hotels.service'
import { logger } from '../logger'

@Controller()
export class DataUpdatesConsumer {

  constructor(
    private readonly appService: TopHotelsService,
  ) {
  }

  @MessagePattern(DataUpdatesMessagePattern.HOTELS_PROCESSING_COMPLETED)
  async handleHotelsProcessingCompleted(@Payload() {
                                          searchId,
                                          timestamp,
                                          data,
                                        }: MqMessage<CollectingTimesDto>,
                                        @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`, data)
    const { collectingStartedAt, collectingFinishedAt } = data
    await this.appService.updateTopHotels(searchId, collectingStartedAt, collectingFinishedAt)
    mqAck(ctx)
  }

  @MessagePattern(DataUpdatesMessagePattern.SEARCH_REQUEST_DELETED)
  async handleSearchRequestDeleted(@Payload() { searchId }: MqMessage,
                                   @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.appService.deleteTopHotels(searchId)
    mqAck(ctx)
  }
}
