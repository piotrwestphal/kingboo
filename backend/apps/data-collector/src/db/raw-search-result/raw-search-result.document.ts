import { RawHotelDocument } from './raw-hotel.document';
import { FirestoreDocument } from '../firestore.document';
import { SearchPlaceIdentifierDocument } from './search-place-identifier.document'

export interface RawSearchResultDocument extends FirestoreDocument {
  readonly searchPlaceIdentifier: SearchPlaceIdentifierDocument;
  readonly collectingTimeSec: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
}
