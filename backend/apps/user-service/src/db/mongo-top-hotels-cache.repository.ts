import { TopHotelsCacheRepository } from '../core/abstract/top-hotels-cache.repository';
import { Model } from "mongoose";
import { TopHotelsCacheDocument } from './top-hotels-cache/top-hotels-cache.document';
import { TopHotelsCacheDocumentMapper } from './top-hotels-cache/top-hotels-cache-document.mapper';
import { TopHotelsCache } from '../core/model/TopHotelsCache';

export class MongoTopHotelsCacheRepository extends TopHotelsCacheRepository {
  constructor(
    private readonly mapper: TopHotelsCacheDocumentMapper,
    private readonly model: Model<TopHotelsCacheDocument>,
  ) {
    super();
  }

  async find(searchId: string): Promise<TopHotelsCache> {
    const found = await this.model.findOne({ searchId }).exec()
    return found
      ? this.mapper.toTopHotels(found)
      : null
  }

  async create(topHotelsCache: TopHotelsCache): Promise<TopHotelsCache> {
    const saveTopHotelsCache = this.mapper.prepareForSave(topHotelsCache)
    const saved = await new this.model(saveTopHotelsCache).save()
    return this.mapper.toTopHotels(saved)
  }

  async delete(searchId: string): Promise<boolean> {
    const deleted = await this.model.deleteOne({ searchId: searchId }).exec();
    return !!deleted.deletedCount
  }
}
