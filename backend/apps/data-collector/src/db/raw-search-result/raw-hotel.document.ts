import { RawRoomDocument } from './raw-room.document';

export interface RawHotelDocument {
  readonly hotelId: string;
  // following parameters always exist
  readonly name: string;
  readonly price: string;
  readonly tax: string;
  readonly distanceFromCenter: string;
  readonly districtName: string;
  readonly coords: string;
  // following parameters might not be available
  readonly rate: string | null;
  readonly secondaryRateType: string | null;
  readonly secondaryRate: string | null;
  readonly numberOfReviews: string | null;
  readonly propertyType: string | null;
  readonly starRating: string | null;
  readonly newlyAdded: string | null;
  readonly bonuses: string[] | null;
  readonly rooms: RawRoomDocument[] | null;
  // additional info
  readonly collectedAt: string;
  readonly debug: Record<string, unknown>;
}
