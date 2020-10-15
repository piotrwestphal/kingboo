import { HotelRepository } from '../core/abstract/hotel.repository';
import { Hotel } from '../core/model/Hotel';
import { Model } from 'mongoose';
import { HotelDocumentMapper } from './hotel/hotel-document.mapper';
import { HotelDocument } from './hotel/document/hotel.document';
import { HotelIdentifier } from '../core/interface/hotel-identifier';
import { TopHotels } from '../core/interface/top-hotels';
import { SimpleHotel } from '../core/interface/simple-hotel';
import { NotFoundException } from '@nestjs/common';

const selectSimpleHotel: Record<keyof SimpleHotel, 1> = {
  searchId: 1,
  hotelId: 1,
  name: 1,
  coords: 1,
  priceChanges: 1,
  latestValues: 1,
  calculatedValues: 1,
  lastCollectedAt: 1,
  collectingCount: 1,
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
      .select({ ...selectSimpleHotel, _id: 0 })
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

  async findTopHotelsBySearchIdOrFail(searchId: string,
                                      collectingStartedAt: string,
                                      collectingFinishedAt?: string): Promise<TopHotels> {
    const findBySearchId = () => this.model.find({
      searchId,
      lastCollectedAt: dateRangeQuery(collectingStartedAt, collectingFinishedAt)
    })
      .orFail(() => new NotFoundException(`Hotels with search id: ${searchId} not exist`))
      .select({ ...selectSimpleHotel, _id: 0 })
      .limit(10);
    const pendingBestPriceRate = findBySearchId().sort({
      'calculatedValues.priceRate': -1,
      'latestValues.price': 1
    }).exec();
    const pendingCheapest = findBySearchId().sort({
      'latestValues.price': 1
    }).exec();
    const pendingBestLocation = findBySearchId().sort({
      'distanceFromCenterMeters': 1,
      'latestValues.price': 1
    }).exec();
    const pendingBestRate = findBySearchId().sort({
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

  private fromDoc = (doc: HotelDocument) => this.mapper.toHotel(doc);
}
