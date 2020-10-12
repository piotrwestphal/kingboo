import { ScrapedRawRoom } from './scraped-raw-room';

export interface ScrapedRawHotel {
  // following parameters always exist
  name: string;
  price: string;
  tax: string;
  distanceFromCenter: string;
  districtName: string;
  coords: string;
  hotelLink: string;
  // following parameters might not be available
  rate: string | null;
  secondaryRate: string | null;
  secondaryRateType: string | null;
  numberOfReviews: string | null;
  propertyType: string | null;
  starRating: string | null;
  newlyAdded: string | null;
  bonuses: string[];
  rooms: ScrapedRawRoom[];
  debug: Record<string, unknown> | null;
}
