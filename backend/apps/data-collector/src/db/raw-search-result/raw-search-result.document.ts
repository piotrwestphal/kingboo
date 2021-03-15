import { RawHotelDocument } from './raw-hotel.document';
import { FirestoreDocument } from '../firestore.document';

export interface RawSearchResultDocument extends FirestoreDocument {
  readonly searchPlaceIdentifier: string;
  readonly collectingTimeSec: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
}
