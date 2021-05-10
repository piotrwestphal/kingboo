import { SearchPlaceIdentifier } from '../../core/interface/search-place-identifier'
import { RawHotelDocument } from './raw-hotel.document'

export interface RawSearchResultDocument {
  readonly searchId: string
  readonly searchPlaceIdentifier: SearchPlaceIdentifier
  readonly collectingTimeSec: number
  readonly hotelsCount: number
  readonly hotels: RawHotelDocument[]
  readonly createdAt: Date
}
