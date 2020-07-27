import { Hotel } from '../model/hotel';

export abstract class HotelRepository {
  abstract findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>>;
  abstract createAll(hotels: Hotel[]): Promise<Hotel[]>;
  abstract updateAll(hotels: Hotel[]): Promise<Hotel[]>;
  abstract findHotelsLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<string[]>;
  abstract deleteMany(searchIds: string[]): Promise<number>;
}
