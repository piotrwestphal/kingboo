import { Model } from 'mongoose';
import { CacheDocument } from './cache/search-request-cache.document';
import { CacheData } from '../core/model/CacheData';
import { CacheRepository } from '../core/abstract/cache.repository';
import { CacheDocumentMapper } from './cache/cache-document.mapper';

export class MongoCacheRepository<T> extends CacheRepository<T> {
  constructor(
    private readonly mapper: CacheDocumentMapper,
    private readonly model: Model<CacheDocument<T>>,
  ) {
    super()
  }

  async find(searchId: string): Promise<CacheData<T> | null> {
    const found = await this.model.findOne({ searchId }).exec()
    return found
      ? this.mapper.toCacheData(found)
      : null
  }

  async findAll(): Promise<Array<CacheData<T>>> {
    const found = await this.model.find({}).exec()
    return found.map(v => this.mapper.toCacheData(v))
  }

  async create(cacheData: CacheData<T>): Promise<CacheData<T>> {
    const saveTopHotelsCache = this.mapper.prepareForSave(cacheData)
    const saved = await new this.model(saveTopHotelsCache).save()
    return this.mapper.toCacheData(saved)
  }

  async createOrUpdate(cacheData: CacheData<T>): Promise<CacheData<T>> {
    const saveCache = this.mapper.prepareForSave(cacheData)
    const found: CacheDocument<T> = await this.model.updateMany(
      { searchId: cacheData.searchId },
      saveCache,
      { upsert: true }).exec()
    return this.mapper.toCacheData(found)
  }

  async delete(searchId: string): Promise<boolean> {
    const deleted = await this.model.deleteOne({ searchId: searchId }).exec();
    return !!deleted.deletedCount
  }
}
