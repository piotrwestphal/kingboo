import { RawRoomDocument } from './raw-room.document';

export interface RawHotelDocument {
  readonly hotelId: string;
  readonly name: string;
  readonly price: string;
  readonly tax: string;
  readonly distanceFromCenter: string;
  readonly districtName: string;
  readonly coords: string;
  readonly rate: string | null;
  readonly secondaryRateType: string | null;
  readonly secondaryRate: string | null;
  readonly numberOfReviews: string | null;
  readonly starRating: number | null;
  readonly newlyAdded: string | null;
  readonly bonuses: string[] | null;
  readonly rooms: RawRoomDocument[] | null;
  readonly collectedAt: string;
}
