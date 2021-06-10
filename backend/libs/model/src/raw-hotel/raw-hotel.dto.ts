import { RawRoomDto } from '@kb/model'

export interface RawHotelDto {
  readonly hotelId: string
  readonly name: string
  readonly price: string | null
  readonly tax: string | null
  readonly distanceFromCenter: string
  readonly distanceFromCenterOrderIndex: number
  readonly districtName: string
  readonly coords: string
  readonly hotelLink: string
  readonly room: string | null
  readonly rate: string | null
  readonly secondaryRate: string | null
  readonly secondaryRateType: string | null
  readonly numberOfReviews: string | null
  readonly starRating: number | null
  readonly newlyAdded: string | null
  readonly bonuses: string[] | null
  readonly rooms: RawRoomDto[] | null
  readonly collectedAt: string
}
