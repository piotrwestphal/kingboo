import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CollectingTimesDto, MqMessage } from '@kb/model'
import { DataUpdatesMessagePattern, mqAck } from '@kb/rabbit'
import { HotelService } from './hotel.service'
import { logger } from '../logger'
import { ScenarioDetailsDto } from '@kb/model'

@Controller()
export class DataUpdatesConsumer {

  constructor(
    private readonly appService: HotelService,
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

  @MessagePattern(DataUpdatesMessagePattern.PLACE_PROCESSING_COMPLETED)
  async handlePlaceProcessingCompleted(@Payload() {
                                         searchId,
                                         timestamp,
                                         data,
                                       }: MqMessage<CollectingTimesDto>,
                                       @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`, data)
    const { collectingStartedAt, collectingFinishedAt } = data
    await this.appService.updateHotel(searchId, collectingStartedAt, collectingFinishedAt)
    mqAck(ctx)
  }

  @MessagePattern(DataUpdatesMessagePattern.SEARCH_REQUEST_DELETED)
  async handleSearchRequestDeleted(@Payload() {
                                     searchId,
                                     data: { scenarioType }
                                   }: MqMessage<ScenarioDetailsDto>,
                                   @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.appService.deleteHotels(searchId, scenarioType)
    mqAck(ctx)
  }
}
