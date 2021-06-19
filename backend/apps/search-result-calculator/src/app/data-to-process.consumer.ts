import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern'
import { HotelsPartDto, HotelsSummaryDto, MqMessage, PlaceSummaryDto } from '@kb/model'
import { HotelService } from './hotels/hotel.service'
import { logger } from '../logger'
import { ProgressMeasuringService } from './processing-progress/progress-measuring.service'
import { mqAck } from '@kb/rabbit'

@Controller()
export class DataToProcessConsumer {

  constructor(
    private readonly hotelService: HotelService,
    private readonly progressMeasuringService: ProgressMeasuringService,
  ) {
  }

  @MessagePattern(DataToProcessMessagePattern.HOTELS_PART)
  async handleHotelsPart(@Payload() { searchId, data: { rawHotels } }: MqMessage<HotelsPartDto>,
                         @Ctx() ctx: RmqContext): Promise<void> {
    const now = Date.now()
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.hotelService.processHotelsPartMessage(searchId, rawHotels)
    logger.debug(`Processed message with search id [${searchId}] within [${Date.now() - now}] ms`)
    mqAck(ctx)
  }

  @MessagePattern(DataToProcessMessagePattern.HOTELS_SUMMARY)
  async handleHotelsSummary(@Payload() {
                              searchId,
                              data,
                            }: MqMessage<HotelsSummaryDto>,
                            @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.progressMeasuringService.summarizeProgress(searchId, data)
    mqAck(ctx)
  }

  @MessagePattern(DataToProcessMessagePattern.PLACE_SUMMARY)
  async handlePlaceSummary(@Payload() {
                             searchId,
                             data,
                           }: MqMessage<PlaceSummaryDto>,
                           @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`)
    await this.hotelService.processPlaceSummaryMessage(searchId, data)
    mqAck(ctx)
  }
}
