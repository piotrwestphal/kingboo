import { SearchRequestRepository } from '../core/abstract/search-request.repository'
import { SearchRequest } from '../core/model/SearchRequest'
import { Model } from 'mongoose'
import { NotFoundException } from '@nestjs/common'
import { SearchRequestDocument } from './search-request/search-request.document'
import { SearchRequestDocumentMapper } from './search-request/search-request-document.mapper'
import { SearchRequestType } from '../core/model/SearchRequestType'

export class MongoSearchRequestRepository extends SearchRequestRepository {

  constructor(
    private readonly mapper: SearchRequestDocumentMapper,
    private readonly model: Model<SearchRequestDocument>,
  ) {
    super()
  }

  async findBySearchId(searchId: string): Promise<SearchRequest> {
    const found = await this.model.findOne({ searchId }).exec()
    return found
      ? this.fromDoc(found)
      : null
  }

  async findBySearchIdOrFail(searchId: string): Promise<SearchRequest> {
    const found = await this.model.findOne({ searchId })
      .orFail(() => new NotFoundException(`Search request with search id: ${searchId} not exist`))
      .exec()
    return found
      ? this.fromDoc(found)
      : null
  }

  async findAll(): Promise<SearchRequest[]> {
    const found = await this.model.find().sort({ checkInDate: 1 }).exec()
    return this.fromDocs(found)
  }

  async findAllWithSearchIds(searchIds: string[]): Promise<SearchRequest[]> {
    const found = await this.model.find({
      searchId: { $in: searchIds },
    }).exec()
    return this.fromDocs(found)
  }

  async findAllWithType(type: SearchRequestType): Promise<SearchRequest[]> {
    const found = await this.model.find({ type }).exec()
    return this.fromDocs(found)
  }

  async create(searchRequest: SearchRequest): Promise<SearchRequest> {
    const saveSearchRequest = this.mapper.prepareForSave(searchRequest)
    const saved = await new this.model(saveSearchRequest).save()
    return this.fromDoc(saved)
  }

  async update(searchRequest: SearchRequest): Promise<SearchRequest> {
    const saveSearchRequest = this.mapper.prepareForSave(searchRequest)
    const updated = await this.model.findOneAndUpdate(
      { searchId: saveSearchRequest.searchId },
      saveSearchRequest,
      { new: true }).exec()
    return this.fromDoc(updated)
  }

  async deleteMany(searchIds: string[]): Promise<number> {
    const deleted = await this.model.deleteMany(
      { searchId: { $in: searchIds } }).exec()
    return deleted.deletedCount
  }

  async findFree(now: Date): Promise<SearchRequest[]> {
    const found = await this.model.find({
      checkInDate: { $gte: now },
      nextSearchScheduledAt: { $lte: now },
    }).sort({ nextSearchScheduledAt: 1 })
      .exec()
    return this.fromDocs(found)
  }

  async findObsoleteCyclicRequests(now: Date): Promise<SearchRequest[]> {
    const found = await this.model.find({
      type: SearchRequestType.CYCLIC,
      checkInDate: { $lte: now },
      nextSearchScheduledAt: { $lte: now },
    }).sort({ nextSearchScheduledAt: 1 })
      .exec()
    return this.fromDocs(found)
  }

  private fromDocs = (docs: SearchRequestDocument[]) => docs.map(doc => this.mapper.toSearchRequest(doc))
  private fromDoc = (doc: SearchRequestDocument) => this.mapper.toSearchRequest(doc)
}
