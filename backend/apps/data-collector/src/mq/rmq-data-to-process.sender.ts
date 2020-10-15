import { DataToProcessSender } from '../core/abstract/data-to-process.sender';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { ClientProxy } from '@nestjs/microservices';
import { RawHotel } from '../core/model/RawHotel';
import { RawHotelMapper } from '../app/mapper/raw-hotel.mapper';
import { HotelsPartDto, HotelsSummaryDto, MqMessage } from '@kb/model';

export class RmqDataToProcessSender extends DataToProcessSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  sendHotelsPart(searchId: string,
                 rawHotels: RawHotel[]): void {
    const rawHotelsDto = rawHotels.map(h => RawHotelMapper.toDto(h));
    this.client.emit<void, MqMessage<HotelsPartDto>>(DataToProcessMessagePattern.HOTELS_PART,
      { searchId, data: { rawHotels: rawHotelsDto }, timestamp: Date.now() });
  }

  sendHotelsSummary(searchId: string,
                    expectedNumberOfParts: number): void {
    this.client.emit<void, MqMessage<HotelsSummaryDto>>(DataToProcessMessagePattern.HOTELS_SUMMARY,
      { searchId, data: { expectedNumberOfParts }, timestamp: Date.now() });
  }
}
