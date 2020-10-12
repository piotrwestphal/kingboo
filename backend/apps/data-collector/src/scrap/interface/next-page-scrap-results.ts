import { ScrapedRawHotel } from './scraped-raw-hotel';

export interface NextPageScrapResults {
  readonly scrapedRawHotels: ScrapedRawHotel[];
  readonly nextPageButtonAvailable: boolean;
}
