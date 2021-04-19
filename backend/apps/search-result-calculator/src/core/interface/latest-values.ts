import { Room } from './room'
import { Bonuses } from './bonuses'

export interface LatestValues {
  readonly price: number
  readonly districtName: string | null
  readonly distanceFromCenterMeters: number | null
  readonly distanceFromCenterOrderIndex: number
  readonly hotelLink: string
  readonly rate: number
  readonly secondaryRate: number | null
  readonly secondaryRateType: string | null
  readonly numberOfReviews: number | null
  readonly newlyAdded: boolean
  readonly starRating: number | null
  readonly bonuses: Bonuses | null
  readonly rooms: Room[] | null
}
