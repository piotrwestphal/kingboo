import { Coords } from '@kb/model';
import { Bonuses } from './bonuses';
import { Room } from './room';

export interface RawHotel {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly price: number | null;
  readonly distanceFromCenterMeters: number | null;
  readonly coords: Coords;
  readonly hotelLink: string;
  readonly districtName: string | null;
  readonly rate: number | null;
  readonly secondaryRate: number | null;
  readonly secondaryRateType: string | null;
  readonly numberOfReviews: number | null;
  readonly starRating: number | null;
  readonly newlyAdded: boolean | null;
  readonly bonuses: Bonuses | null;
  readonly rooms: Room[] | null;
  readonly collectedAt: string;
}
