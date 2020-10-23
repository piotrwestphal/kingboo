import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { HotelsPartDto, HotelsSummaryDto, MqMessage } from '@kb/model';
import { HotelProcessor } from './hotels/hotel.processor';
import { logger } from '../logger';
import { ProgressMeasuringService } from './processing-progress/progress-measuring.service';
import { mqAck } from '@kb/rabbit';

@Controller()
export class DataToProcessConsumer {

  constructor(
    private readonly hotelProcessor: HotelProcessor,
    private readonly progressMeasuringService: ProgressMeasuringService,
  ) {
  }

  @MessagePattern(DataToProcessMessagePattern.HOTELS_PART)
  async handleHotelsPart(@Payload() { searchId, data: { rawHotels } }: MqMessage<HotelsPartDto>,
                         @Ctx() ctx: RmqContext): Promise<void> {
    const debugMarker = Date.now(); // TODO: change to now when bug with performance will be tracked down :)
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`);
    await this.hotelProcessor.processMessage(searchId, rawHotels, debugMarker);
    logger.debug(`[${debugMarker}] Processed message with search id [${searchId}] within [${Date.now() - debugMarker}] ms`);
    mqAck(ctx);
  }

  @MessagePattern(DataToProcessMessagePattern.HOTELS_SUMMARY)
  async handleHotelsSummary(@Payload() {
                              searchId,
                              data,
                            }: MqMessage<HotelsSummaryDto>,
                            @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`);
    await this.progressMeasuringService.summarizeProgress(searchId, data);
    mqAck(ctx);
  }
}
