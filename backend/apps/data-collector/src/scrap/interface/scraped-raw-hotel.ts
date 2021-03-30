import { ScrapedRawRoom } from './scraped-raw-room';

export interface ScrapedRawHotel {
  readonly name: string;
  readonly price: string;
  readonly tax: string;
  readonly distanceFromCenter: string;
  readonly distanceFromCenterOrderIndex: number;
  readonly coords: string;
  readonly hotelLink: string;
  readonly districtName: string | null;
  readonly rate: string | null;
  readonly secondaryRate: string | null;
  readonly secondaryRateType: string | null;
  readonly numberOfReviews: string | null;
  readonly starRating: number | null;
  readonly newlyAdded: string | null;
  readonly bonuses: string[] | null;
  readonly rooms: ScrapedRawRoom[] | null;
  readonly debug?: string;
}
