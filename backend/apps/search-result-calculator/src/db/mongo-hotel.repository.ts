import { HotelRepository } from '../core/abstract/hotel.repository'
import { Hotel } from '../core/model/Hotel'
import { Model } from 'mongoose'
import { HotelDocumentMapper } from './hotel/hotel-document.mapper'
import { HotelDocument } from './hotel/document/hotel.document'
import { HotelIdentifier } from '../core/interface/hotel-identifier'

export class MongoHotelRepository extends HotelRepository {

  constructor(
    private readonly mapper: HotelDocumentMapper,
    private readonly model: Model<HotelDocument>,
  ) {
    super()
  }

  async findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>> {
    const hotelsDocs = await this.model.find({
      searchId,
      hotelId: {
        $in: hotelIds,
      },
    }).exec()
    const hotelIdByHotel = new Map<string, Hotel>()
    if (hotelsDocs?.length > 0) {
      return hotelsDocs.reduce((map, hotelDoc) => {
        const hotel = this.fromDoc(hotelDoc)
        return map.set(hotelDoc.hotelId, hotel)
      }, hotelIdByHotel)
    }
    return hotelIdByHotel
  }

  async findLastUpdatedGivenMsAgo(now: Date, msAgo: number): Promise<HotelIdentifier[]> {
    const offset = new Date(now.valueOf() - msAgo) // x ms ago
    const found = await this.model.find({
      updatedAt: { $lte: offset },
    }).limit(1000).exec()
    return found.map(({ searchId, hotelId }) => ({ searchId, hotelId }))
  }

  async createAll(hotels: Hotel[]): Promise<Hotel[]> {
    const hotelsToSave = hotels.map(h => this.mapper.prepareForSave(h))
    const created = await this.model.insertMany(hotelsToSave)
    return created.map(doc => this.fromDoc(doc))
  }

  async updateAll(hotels: Hotel[]): Promise<number> {
    const updateOps = hotels.map(h => this.mapper.prepareForSave(h))
      .map(sh => ({
        updateOne: {
          filter: {
            searchId: sh.searchId,
            hotelId: sh.hotelId,
          },
          update: {
            $set: sh,
          },
          upsert: true,
        }
      }))
    const writeResult = await this.model.bulkWrite(updateOps)
    return writeResult.modifiedCount
  }

  async deleteMany(hotelIdentifiers: HotelIdentifier[]): Promise<number> {
    const pendingDeletions = hotelIdentifiers.map(({ searchId, hotelId }) =>
      this.model.deleteOne({ searchId, hotelId }).exec())
    const deleted = await Promise.all(pendingDeletions)
    return deleted.length
  }

  private fromDoc = (doc: HotelDocument) => this.mapper.fromDoc(doc)
}
