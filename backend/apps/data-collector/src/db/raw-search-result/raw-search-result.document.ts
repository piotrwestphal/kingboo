import { RawHotelDocument } from './raw-hotel.document';
import Timestamp = FirebaseFirestore.Timestamp;

export interface RawSearchResultDocument {
  readonly docId: string;
  readonly searchId: string;
  readonly searchPlaceIdentifier: string;
  readonly collectingTimeSec: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
  readonly createdAt: Timestamp;
}
