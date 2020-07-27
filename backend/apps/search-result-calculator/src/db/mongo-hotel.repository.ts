import { HotelRepository } from '../core/abstract/hotel.repository';
import { Hotel } from '../core/model/hotel';
import { Model } from 'mongoose';
import { MongoHotelDocumentMapper } from './mongo-hotel-document.mapper';
import { HotelDocument } from './interface/hotel.document';
import { HotelIdentifier } from '../core/interface/hotel-identifier';

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

  findLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<HotelIdentifier[]> {
    const offset = new Date(now.valueOf() - days * this.DAY); // x days ago
    return this.model.find({
      updatedAt: { $lte: offset },
    })
      .map(docs => docs.map(({ searchId, hotelId }) => ({
        searchId, hotelId
      })))
      .exec();
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

  async deleteMany(hotelIdentifiers: HotelIdentifier[]): Promise<number> {
    const pendingDeletions = hotelIdentifiers.map(({ searchId, hotelId }) =>
      this.model.deleteOne({ searchId, hotelId }).exec());
    const deleted = await Promise.all(pendingDeletions);
    return deleted.length;
  }

  private fromDoc = (doc: HotelDocument) => this.mapper.toHotel(doc);
}
