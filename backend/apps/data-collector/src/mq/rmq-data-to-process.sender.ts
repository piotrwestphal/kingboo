import { DataToProcessSender } from '../core/abstract/data-to-process.sender';
import { DataToProcessMessagePattern } from '@kb/rabbit/message-pattern/DataToProcessMessagePattern';
import { ClientProxy } from '@nestjs/microservices';
import { HotelsPartDto, HotelsSummaryDto, MqMessage, RawHotelDto } from '@kb/model';
import { PlaceSummaryDto } from '@kb/model'

export class RmqDataToProcessSender extends DataToProcessSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  sendHotelsPart(searchId: string,
                 rawHotelDtos: RawHotelDto[]): void {
    this.client.emit<void, MqMessage<HotelsPartDto>>(DataToProcessMessagePattern.HOTELS_PART, {
      searchId,
      timestamp: Date.now(),
      data: { rawHotels: rawHotelDtos }
    });
  }

  sendHotelsSummary(searchId: string,
                    expectedNumberOfParts: number,
                    collectingStartedAt: Date,
                    collectingFinishedAt: Date): void {
    this.client.emit<void, MqMessage<HotelsSummaryDto>>(DataToProcessMessagePattern.HOTELS_SUMMARY, {
      searchId,
      timestamp: Date.now(),
      data: {
        expectedNumberOfParts,
        collectingStartedAt: collectingStartedAt.toISOString(),
        collectingFinishedAt: collectingFinishedAt.toISOString()
      }
    });
  }

  sendPlaceSummary(searchId: string,
                   rawHotelDto: RawHotelDto,
                   collectingStartedAt: Date,
                   collectingFinishedAt: Date): void {
    this.client.emit<void, MqMessage<PlaceSummaryDto>>(DataToProcessMessagePattern.PLACE_SUMMARY, {
      searchId,
      timestamp: Date.now(),
      data: {
        rawHotelDto,
        collectingStartedAt: collectingStartedAt.toISOString(),
        collectingFinishedAt: collectingFinishedAt.toISOString()
      }
    });
  }
}
