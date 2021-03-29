import { HotelRepository } from '../core/abstract/hotel.repository';
import { Hotel } from '../core/model/Hotel';
import { Model } from 'mongoose';
import { HotelDocumentMapper } from './hotel/hotel-document.mapper';
import { HotelDocument } from './hotel/document/hotel.document';
import { HotelIdentifier } from '../core/interface/hotel-identifier';
import { TopHotels } from '../core/interface/top-hotels';
import { SimpleHotel } from '../core/interface/simple-hotel';
import { NotFoundException } from '@nestjs/common';
import { logger } from '../logger'

const selectSimpleHotel: Record<keyof SimpleHotel & '_id', 1 | 0> = {
  searchId: 1,
  hotelId: 1,
  name: 1,
  coords: 1,
  priceChanges: 1,
  latestValues: 1,
  calculatedValues: 1,
  lastCollectedAt: 1,
  collectingCount: 1,
  _id: 0,
}

const dateRangeQuery = (startDate: string, endDate?: string) => {
  const query = { $gte: startDate }
  return endDate
    ? { ...query, $lte: endDate }
    : query
}

export class MongoHotelRepository extends HotelRepository {

  private readonly DAY = 24 * 60 * 60 * 1000;

  constructor(
    private readonly mapper: HotelDocumentMapper,
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

  findAllBySearchId(searchId: string,
                    collectingStartedAt: string,
                    collectingFinishedAt?: string): Promise<SimpleHotel[]> {
    return this.model.find({
      searchId,
      lastCollectedAt: dateRangeQuery(collectingStartedAt, collectingFinishedAt)
    })
      .select({ ...selectSimpleHotel })
      .sort({ distanceFromCenterMeters: 1 })
      .exec();
  }

  findLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<HotelIdentifier[]> {
    const offset = new Date(now.valueOf() - days * this.DAY); // x days ago
    return this.model.find({
      updatedAt: { $lte: offset },
    }).limit(1000)
      .map(docs => docs.map(({ searchId, hotelId }) => ({
        searchId, hotelId
      })))
      .exec();
  }

  async createAll(hotels: Hotel[]): Promise<Hotel[]> {
    const hotelsToSave = hotels.map(h => this.mapper.prepareForSave(h))
    const created = await this.model.insertMany(hotelsToSave);
    return created.map(doc => this.fromDoc(doc));
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
          upsert: true, // TODO: maybe merge create and update ops
        }
      }))
    const writeResult = await this.model.bulkWrite(updateOps)
    return writeResult.modifiedCount
  }

  async deleteMany(hotelIdentifiers: HotelIdentifier[]): Promise<number> {
    const pendingDeletions = hotelIdentifiers.map(({ searchId, hotelId }) =>
      this.model.deleteOne({ searchId, hotelId }).exec());
    const deleted = await Promise.all(pendingDeletions);
    return deleted.length;
  }

  async findTopHotelsBySearchIdOrFail(searchId: string,
                                      collectingStartedAt: string,
                                      collectingFinishedAt?: string): Promise<TopHotels> {
    const findBySearchId = (cond) => this.model.find({
      searchId,
      lastCollectedAt: dateRangeQuery(collectingStartedAt, collectingFinishedAt)
    })
      // TODO: sometimes it fails - log some actions here
      .orFail((err) => {
        logger.error(`Error when searching for hotels by ${cond}`, err)
        return new NotFoundException(
          `Hotels with search id: ${searchId} and for range from ${collectingStartedAt} to ${collectingFinishedAt} not exist`)
      })
      .select({ ...selectSimpleHotel })
      .limit(10);
    const pendingBestPriceRate = findBySearchId('priceRate').sort({
      'calculatedValues.priceRate': -1,
      'latestValues.price': 1
    }).exec();
    const pendingCheapest = findBySearchId('price').sort({
      'latestValues.price': 1
    }).exec();
    const pendingBestLocation = findBySearchId('distance').sort({
      'distanceFromCenterMeters': 1,
      'latestValues.price': 1
    }).exec();
    const pendingBestRate = findBySearchId('rate').sort({
      'latestValues.rate': -1,
      'latestValues.price': 1
    }).exec();
    const [
      bestPriceRate,
      cheapest,
      bestLocation,
      bestRate
    ] = await Promise.all([pendingBestPriceRate, pendingCheapest, pendingBestLocation, pendingBestRate])
    return {
      bestPriceRate,
      cheapest,
      bestLocation,
      bestRate,
    }
  }

  private fromDoc = (doc: HotelDocument) => this.mapper.fromDoc(doc);
}
