import { HotelRepository } from '../core/abstract/hotel.repository';
import { Hotel } from '../core/model/hotel';
import { Model } from 'mongoose';
import { MongoHotelDocumentMapper } from './mongo-hotel-document.mapper';
import { HotelDocument } from './interface/hotel.document';

export class MongoHotelRepository extends HotelRepository {

  private readonly DAY = 24 * 60 * 60 * 1000;

  constructor(
    private readonly mapper: MongoHotelDocumentMapper,
    private readonly model: Model<HotelDocument>,
  ) {
    super();
  }

  async findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>> {
    const hotelsDocs = await this.model.find({
      searchId,
      hotelId: {
        $in: hotelIds,
      },
    }).exec();
    const hotelIdByHotel = new Map<string, Hotel>();
    if (hotelsDocs?.length > 0) {
      return hotelsDocs.reduce((map, hotelDoc) => {
        const hotel = this.fromDoc(hotelDoc);
        return map.set(hotelDoc.hotelId, hotel);
      }, hotelIdByHotel);
    }
    return hotelIdByHotel;
  }

  async createAll(hotels: Hotel[]): Promise<Hotel[]> {
    const created = await this.model.insertMany(hotels);
    return created.map(doc => this.fromDoc(doc));
  }

  async updateAll(hotels: Hotel[]): Promise<Hotel[]> {
    const updated = await Promise.all(hotels.map(hotel => this.model.findOneAndUpdate({
        searchId: hotel.searchId,
        hotelId: hotel.hotelId,
      },
      hotel as any, // TODO: remove `any` when @types/mongoose add proper types for sub documents
      { new: true },
    ).exec()));
    return updated.map(doc => this.fromDoc(doc));
  }

  findHotelsLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<string[]> {
    const offset = new Date(now.valueOf() - days * this.DAY); // x days ago
    return this.model.find({
      updatedAt: { $lte: offset},
    })
      .map(docs => docs.map(doc => doc.searchId))
      .exec();
  }

  async deleteMany(searchIds: string[]): Promise<number> {
    const deleted = await this.model.deleteMany(
      { searchId: { $in: searchIds } }).exec();
    return deleted.deletedCount;
  }

  private fromDoc = (doc: HotelDocument) => this.mapper.toHotel(doc);
}
