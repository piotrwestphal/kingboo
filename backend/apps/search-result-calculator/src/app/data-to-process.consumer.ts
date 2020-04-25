import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
  handleHotelsData(@Payload() message: CollectedHotelsMessage): void {
    this.hotelService.processMessage(message)
  }
}
