import { Room } from './room'
import { Bonuses } from './bonuses'

export interface LatestValues {
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
  readonly bonuses: Bonuses | null
  readonly rooms: Room[] | null
}
