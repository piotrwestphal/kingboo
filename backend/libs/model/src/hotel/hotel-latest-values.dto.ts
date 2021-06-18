import { HotelBonusesDto } from '@kb/model'
import { HotelRoomDto } from '@kb/model'

export interface HotelLatestValuesDto {
  readonly price: number | null
  readonly districtName: string | null
  readonly distanceFromCenterMeters: number | null
  readonly distanceFromCenterOrderIndex: number
  readonly hotelLink: string
  readonly roomName: string | null
  readonly rate: number | null
  readonly secondaryRate: number | null
  readonly secondaryRateType: string | null
  readonly numberOfReviews: number | null
  readonly newlyAdded: boolean
  readonly starRating: number | null
  readonly bonuses: HotelBonusesDto | null
  readonly rooms: HotelRoomDto[] | null
}
