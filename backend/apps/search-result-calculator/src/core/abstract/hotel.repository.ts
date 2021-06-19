import { Hotel } from '../model/Hotel'
import { HotelIdentifier } from '../interface/hotel-identifier'

export abstract class HotelRepository {
  abstract findBySearchIdAndHotelId(searchId: string, hotelId: string): Promise<Hotel>

  abstract findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>>

  abstract create(hotel: Hotel): Promise<Hotel>

  abstract createAll(hotels: Hotel[]): Promise<Hotel[]>

  abstract update(hotel: Hotel): Promise<Hotel>

  abstract updateAll(hotels: Hotel[]): Promise<number>

  abstract findLastUpdatedGivenMsAgo(now: Date, days: number): Promise<HotelIdentifier[]>

  abstract deleteMany(hotelsIdentifiers: HotelIdentifier[]): Promise<number>
}
