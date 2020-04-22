import { SearchRequestRepository } from '../core/abstract/search-request.repository';
import { SearchRequest } from '../core/model/SearchRequest';
import { Model } from 'mongoose';
import { SearchRequestDocument } from './interface/search-request.document';
import { SearchRequestDocumentMapper } from './mapper/search-request-document.mapper';
import { InconsistencyException } from '../core/exception/InconsistencyException';
import { OccupancyStatus } from '../core/model/OccupancyStatus';

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
      ? this.map(found)
      : null;
  }

  async create(searchRequest: SearchRequest): Promise<SearchRequest> {
    const base = this.mapper.prepareForSave(searchRequest);
    const saved = await new this.searchRequestModel(base).save();
    return this.map(saved);
  }

  async update(searchRequest: SearchRequest): Promise<SearchRequest> {
    const base = this.mapper.prepareForSave(searchRequest);
    const updated = await this.searchRequestModel.findOneAndUpdate(
      { searchId: base.searchId },
      base,
      { new: true }).exec();
    return this.map(updated);
  }

  public delete(searchId: string): Promise<SearchRequestDocument> | null {
    return this.searchRequestModel.findOneAndDelete({ searchId })
      .orFail(this.throwError(searchId)).exec();
  }

  findObsolete(): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({
      occupancyStatus: OccupancyStatus.FREE,
      checkInDate: { $lte: new Date() },
    })
      .sort({ occupancyUpdatedAt: 1 })
      .map((res) => res.map(doc => this.map(doc)))
      .exec();
  }

  findValidSortedByPriority(): Promise<SearchRequest[]> {
    return this.searchRequestModel.find({
      occupancyStatus: OccupancyStatus.FREE,
      checkInDate: { $gte: new Date() },
    })
      .sort({ priority: 1 })
      .map((res) => res.map(doc => this.map(doc)))
      .exec();
  }

  private map = (doc: SearchRequestDocument) => SearchRequestDocumentMapper.toSearchRequest(doc);

  private throwError = (searchId: string) => new InconsistencyException(`Search request with search id: ${searchId} not exist`);
}
