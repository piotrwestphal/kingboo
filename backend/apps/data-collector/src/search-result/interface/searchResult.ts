import { HotelWithId } from './hotelWithId';

export interface SearchResult {
    readonly searchId: string;
    readonly collectingTimeSeconds: number;
    readonly hotelsCount: number;
    readonly hotels: HotelWithId[];
}
