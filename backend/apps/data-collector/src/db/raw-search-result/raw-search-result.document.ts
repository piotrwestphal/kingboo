import { RawHotelDocument } from './raw-hotel.document';
import { FirestoreDocument } from '../firestore.document';

export interface RawSearchResultDocument extends FirestoreDocument {
  readonly searchId: string;
  readonly searchPlaceIdentifier: string;
  readonly collectingTimeSec: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
}
