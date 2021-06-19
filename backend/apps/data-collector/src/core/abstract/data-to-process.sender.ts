import { RawHotelDto } from '@kb/model'

export abstract class DataToProcessSender {
  abstract sendHotelsPart(searchId: string,
                          rawHotelDtos: RawHotelDto[]): void

  abstract sendHotelsSummary(searchId: string,
                             expectedNumberOfParts: number,
                             collectingStartedAt: Date,
                             collectingFinishedAt: Date): void

  abstract sendPlaceSummary(searchId: string,
                            rawHotelDto: RawHotelDto,
                            collectingStartedAt: Date,
                            collectingFinishedAt: Date): void
}
