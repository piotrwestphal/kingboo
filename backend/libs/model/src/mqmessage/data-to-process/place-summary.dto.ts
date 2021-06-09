import { RawHotelDto } from '@kb/model'

export interface PlaceSummaryDto {
  readonly rawHotel: RawHotelDto
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
}
