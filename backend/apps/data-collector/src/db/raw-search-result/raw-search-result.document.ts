import { RawHotelDocument } from './raw-hotel.document'
import { SearchPlaceIdentifierDocument } from './search-place-identifier.document'
import { FirestoreDocument } from '@kb/firestore'

export interface RawSearchResultDocument extends FirestoreDocument {
  readonly searchPlaceIdentifier: SearchPlaceIdentifierDocument
  readonly collectingTimeSec: number
  readonly hotelsCount: number
  readonly hotels: RawHotelDocument[]
}
