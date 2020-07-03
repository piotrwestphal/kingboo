import { HotelRepository } from '../core/abstract/hotel.repository';
import { Hotel } from '../core/model/hotel';
import { Model } from 'mongoose';
import { MongoHotelDocumentMapper } from './mongo/mongo-hotel-document.mapper';
import { HotelDocument } from './mongo/interface/hotel.document';

export class MongoHotelRepository extends HotelRepository {

  constructor(
    private readonly mapper: MongoHotelDocumentMapper,
    private readonly hotelModel: Model<HotelDocument>,
  ) {
    super();
  }

  async findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>> {
    const hotelsDocs = await this.hotelModel.find({
      searchId,
      hotelId: {
        $in: hotelIds,
      },
    }).exec();
    const emptyMap = new Map<string, Hotel>();
    if (hotelsDocs && hotelsDocs.length > 0) {
      return hotelsDocs.reduce((map, hotelDoc) => {
        const hotel = this.mapper.toHotel(hotelDoc);
        return map.set(hotelDoc.hotelId, hotel);
      }, emptyMap);
    }
    return emptyMap;
  }

  async createAll(hotels: Hotel[]): Promise<Hotel[]> {
    const created = await this.hotelModel.insertMany(hotels);
    return created.map(doc => this.mapper.toHotel(doc));
  }

  async updateAll(hotels: Hotel[]): Promise<Hotel[]> {
    const updated = await Promise.all(hotels.map(hotel => this.hotelModel.findOneAndUpdate({
        searchId: hotel.searchId,
        hotelId: hotel.hotelId,
      },
      hotel as any, // TODO: remove `any` when @types/mongoose add proper types for sub documents
      { new: true },
    ).exec()));
    return updated.map(doc => this.mapper.toHotel(doc));
  }
}
