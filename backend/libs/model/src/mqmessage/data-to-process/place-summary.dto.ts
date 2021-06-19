import { RawHotelDto } from '@kb/model'

export interface PlaceSummaryDto {
  readonly rawHotelDto: RawHotelDto
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
}
