import { HotelWithId } from './hotelWithId';

export interface SearchResult {
    readonly searchId: string;
    readonly scrapingTimeSeconds: number;
    readonly hotelsCount: number;
    readonly hotels: HotelWithId[];
}
