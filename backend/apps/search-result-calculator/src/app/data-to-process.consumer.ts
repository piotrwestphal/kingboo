import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { HotelsPartDto, HotelsSummaryDto, MqMessage } from '@kb/model';
import { HotelProcessor } from './hotels/hotel.processor';
import { logger } from '../logger';
import { ProgressMeasuringService } from './processing-progress/progress-measuring.service';

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
    const now = Date.now();
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`);
    await this.hotelProcessor.processMessage(searchId, rawHotels);
    const messageProcessingTimeMs = Date.now() - now;
    logger.info(`Processed message with search id [${searchId}] within [${messageProcessingTimeMs}] ms`);
    this.ack(ctx)
  }

  @MessagePattern(DataToProcessMessagePattern.HOTELS_SUMMARY)
  async handleHotelsSummary(@Payload() { searchId, data: { expectedNumberOfParts } }: MqMessage<HotelsSummaryDto>,
                            @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${ctx.getPattern()} message with search id [${searchId}]`);
    await this.progressMeasuringService.summarizeProgress(searchId, expectedNumberOfParts);
    this.ack(ctx)
  }

  private ack = (ctx: RmqContext) => {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
  }
}
