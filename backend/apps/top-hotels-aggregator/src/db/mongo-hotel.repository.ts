import { HotelRepository } from '../core/abstract/hotel.repository'
import { Model } from 'mongoose'
import { HotelDocument } from './hotel/hotel.document'
import { SortedByOption } from '../core/interface/sorted-by-option'
import { HotelDocumentMapper } from './hotel/hotel-document.mapper'
import { SimpleHotelDocument } from './hotel/simple-hotel.document'
import { SimpleHotelDto } from '@kb/model'

const selectSimpleHotel: Record<keyof SimpleHotelDto & '_id', 1 | 0> = {
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

  constructor(
    private readonly mapper: HotelDocumentMapper,
    private readonly model: Model<HotelDocument>,
  ) {
    super()
  }

  async findTopHotels(searchId: string,
                      collectingStartedAt: string,
                      collectingFinishedAt: string | null,
                      sortedBy: SortedByOption[],
                      limit: number): Promise<SimpleHotelDto[]> {
    const sort = sortedBy.reduce((prev, { value, order }) => {
      return {
        ...prev,
        [value]: order,
      }
    }, {} as Record<string, number>)
    const simpleHotels = await this.model.find({
      searchId,
      lastCollectedAt: dateRangeQuery(collectingStartedAt, collectingFinishedAt)
    }).sort(sort)
      .limit(limit)
      .select({ ...selectSimpleHotel }) // for better performance
      .exec() as SimpleHotelDocument[]
    return simpleHotels.map(v => this.mapper.fromDoc(v))
  }
}
