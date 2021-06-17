import { RawHotelDto } from '@kb/model'

export type PlaceSummaryData = {
  readonly rawHotelDto: RawHotelDto
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
}
