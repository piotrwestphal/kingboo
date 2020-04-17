import { RawRoomDto } from '@kb/model/raw-room.dto';

export interface RawHotelDto {
  readonly hotelId: string;
  readonly name: string;
  readonly price: string;
  readonly tax: string;
  readonly distanceFromCenter: string;
  readonly districtName: string;
  readonly coords: string;
  readonly hotelLink: string;
  // following parameters might not be available
  readonly rate: string | null;
  readonly secondaryRate: string | null;
  readonly secondaryRateType: string | null;
  readonly numberOfReviews: string | null;
  readonly propertyType: string | null;
  readonly starRating: string | null;
  readonly newlyAdded: string | null;
  readonly bonuses: string[] | null;
  readonly rooms: RawRoomDto[] | null;
}
