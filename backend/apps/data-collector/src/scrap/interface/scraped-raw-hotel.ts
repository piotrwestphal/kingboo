import { ScrapedRawRoom } from './scraped-raw-room';
import { DebugValues } from './debug.values';

export interface ScrapedRawHotel {
  // following parameters always exist
  readonly name: string;
  readonly price: string;
  readonly tax: string;
  readonly distanceFromCenter: string;
  readonly coords: string;
  readonly hotelLink: string;
  readonly debug: DebugValues;
  // following parameters might not be available
  readonly districtName: string | null;
  readonly rate: string | null;
  readonly secondaryRate: string | null;
  readonly secondaryRateType: string | null;
  readonly numberOfReviews: string | null;
  readonly starRating: number | null;
  readonly newlyAdded: string | null;
  readonly bonuses: string[] | null;
  readonly rooms: ScrapedRawRoom[] | null;
}
