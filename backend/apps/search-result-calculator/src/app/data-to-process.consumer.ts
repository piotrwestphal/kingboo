import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { CollectedHotelsMessage } from '@kb/model';
import { HotelService } from './hotel.service';

@Controller()
export class DataToProcessConsumer {

  constructor(
    private readonly hotelService: HotelService,
  ) {
  }


  @MessagePattern(DataToProcessMessagePattern.HOTELS)
  async handleHotelsData(@Payload() message: CollectedHotelsMessage,
                         @Ctx() ctx: RmqContext) {
    await this.hotelService.processMessage(message);
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
  }
}
