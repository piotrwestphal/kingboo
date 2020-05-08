import { SearchRequestRepository } from '../core/abstract/search-request.repository';
import { SearchRequest } from '../core/model/SearchRequest';
import { Model } from 'mongoose';
import { SearchRequestDocument } from './interface/search-request.document';
import { SearchRequestDocumentMapper } from './mapper/search-request-document.mapper';
import { OccupancyStatus } from '../core/model/OccupancyStatus';
import { SearchRequestType } from '../core/model/SearchRequestType';

export class MongoSearchRequestRepository extends SearchRequestRepository {

  constructor(
    private readonly mapper: SearchRequestDocumentMapper,
    private readonly searchRequestModel: Model<SearchRequestDocument>,
  ) {
    super();
  }

  async findBySearchId(searchId: string): Promise<SearchRequest> {
    const found = await this.searchRequestModel.findOne({ searchId }).exec();
    return found
      ? this.fromDoc(found)
      : null;
  }

  findAllWithSearchIds(searchIds: string[]): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({
      searchId: { $in: searchIds },
    })
      .map(docs => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  findAllWithType(type: SearchRequestType): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({ type })
      .map(docs => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  async create(searchRequest: SearchRequest): Promise<SearchRequest> {
    const saveSearchRequest = this.mapper.prepareForSave(searchRequest);
    const saved = await new this.searchRequestModel(saveSearchRequest).save();
    return this.fromDoc(saved);
  }

  async update(searchRequest: SearchRequest): Promise<SearchRequest> {
    const saveSearchRequest = this.mapper.prepareForSave(searchRequest);
    const updated = await this.searchRequestModel.findOneAndUpdate(
      { searchId: saveSearchRequest.searchId },
      saveSearchRequest,
      { new: true }).exec();
    return this.fromDoc(updated);
  }

  async deleteMany(searchIds: string[]): Promise<number> {
    const deleted = await this.searchRequestModel.deleteMany(
      { searchId: { $in: searchIds } }).exec();
    return deleted.deletedCount;
  }

  findObsoleteCyclicRequests(): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({
      type: SearchRequestType.CYCLIC,
      occupancyStatus: OccupancyStatus.FREE,
      checkInDate: { $lte: new Date() },
    })
      .sort({ occupancyUpdatedAt: 1 })
      .map((docs) => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  findFreeAndValid(now: Date): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({
      occupancyStatus: OccupancyStatus.FREE,
      checkInDate: { $gte: now },
    })
      .sort({ priority: 1 })
      .map((docs) => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  findOccupiedLongerThanGivenThreshold(now: Date, minutes: number): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({
      occupancyStatus: OccupancyStatus.BUSY,
      occupancyUpdatedAt: { $lte: new Date(now.getTime() - (minutes * 60000)) },
    })
      .sort({ priority: 1 })
      .map((docs) => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  private fromDoc = (doc: SearchRequestDocument) => this.mapper.toSearchRequest(doc);
}
