import { RawHotelDocument } from './raw-hotel.document';

export interface RawSearchResultDocument {
  readonly searchId: string;
  readonly searchPlaceIdentifier: string;
  readonly collectingTimeSec: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
}
