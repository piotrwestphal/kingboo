import { DataToProcessSender } from '../core/abstract/data-to-process.sender';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { ClientProxy } from '@nestjs/microservices';
import { RawHotel } from '../core/model/RawHotel';
import { CollectedHotelsMessage } from '@kb/model/mqmessage/collected-hotels.message';
import { RawHotelMapper } from '../app/mapper/raw-hotel.mapper';

export class RmqDataToProcessSender extends DataToProcessSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  sendHotels(searchId: string,
             rawHotels: RawHotel[],
             collectedAt: string): void {
    const rawHotelsDto = rawHotels.map(h => RawHotelMapper.toDto(h));
    this.client.emit<void, CollectedHotelsMessage>(DataToProcessMessagePattern.HOTELS,
      { searchId, rawHotels: rawHotelsDto, collectedAt, timestamp: Date.now() });
  }
}
