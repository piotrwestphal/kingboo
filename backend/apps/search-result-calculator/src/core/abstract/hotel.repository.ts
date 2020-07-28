import { Hotel } from '../model/hotel';
import { HotelIdentifier } from '../interface/hotel-identifier';

export abstract class HotelRepository {
  abstract findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>>;
  abstract createAll(hotels: Hotel[]): Promise<Hotel[]>;
  abstract updateAll(hotels: Hotel[]): Promise<Hotel[]>;
  abstract findLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<HotelIdentifier[]>;
  abstract deleteMany(hotelsIdentifiers: HotelIdentifier[]): Promise<number>;
}
