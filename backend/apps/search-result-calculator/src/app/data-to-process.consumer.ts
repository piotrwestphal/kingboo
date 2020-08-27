import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { CollectedHotelsMessage } from '@kb/model';
import { HotelProcessor } from './hotels/hotel.processor';
import { logger } from '../logger';

@Controller()
export class DataToProcessConsumer {

  constructor(
    private readonly hotelProcessor: HotelProcessor,
  ) {
  }

  @MessagePattern(DataToProcessMessagePattern.HOTELS)
  async handleHotelsData(@Payload() message: CollectedHotelsMessage,
                         @Ctx() ctx: RmqContext): Promise<void> {
    logger.info(`Receive ${DataToProcessMessagePattern.HOTELS} message with search id [${message.searchId}]`);
    await this.hotelProcessor.processMessage(message);
    logger.info(`Processed message with search id [${message.searchId}]`);
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
  }
}
