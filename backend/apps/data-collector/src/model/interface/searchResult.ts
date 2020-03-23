import { HotelWithId } from './hotelWithId';

export interface SearchResult {
    readonly searchId: string;
    readonly searchPerformedForPlace: string;
    readonly scrapingTimeSeconds: number;
    readonly searchProcessTimeSeconds: number;
    readonly hotelsCount: number;
    readonly hotels: HotelWithId[];
}
