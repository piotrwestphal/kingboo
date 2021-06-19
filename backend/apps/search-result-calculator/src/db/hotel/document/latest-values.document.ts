import { Document } from 'mongoose'
import { BonusesDocument } from './bonuses.document'
import { RoomDocument } from './room.document'

export interface LatestValuesDocument extends Document {
  readonly price: number | null
  readonly districtName: string | null
  readonly distanceFromCenterMeters: number
  readonly hotelLink: string
  readonly roomName: string | null
  readonly rate: number | null
  readonly secondaryRate: number | null
  readonly secondaryRateType: string | null
  readonly numberOfReviews: number | null
  readonly newlyAdded: boolean
  readonly starRating: number | null
  readonly bonuses: BonusesDocument | null
  readonly rooms: RoomDocument[] | null
}
