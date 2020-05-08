import { CyclicSearchRepository } from '../core/abstract/cyclic-search.repository';
import { CyclicSearch } from '../core/model/CyclicSearch';
import { Model } from 'mongoose';
import { CyclicSearchDocument } from './interface/cyclic-search.document';
import { CyclicSearchDocumentMapper } from './mapper/cyclic-search-document.mapper';

export class MongoCyclicSearchRepository extends CyclicSearchRepository {

  constructor(
    private readonly cyclicSearchModel: Model<CyclicSearchDocument>,
    private readonly mapper: CyclicSearchDocumentMapper,
  ) {
    super();
  }

  findAll(): Promise<CyclicSearch[]> {
    return this.cyclicSearchModel.find({})
      .map(docs => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  findByCyclicId(cyclicId: string): Promise<CyclicSearch> {
    return this.cyclicSearchModel.findOne({cyclicId})
      .map(doc => doc ? this.fromDoc(doc): null).exec();
  }

  findByCyclicSearchRequest(searchId: string): Promise<CyclicSearch | null> {
    return this.cyclicSearchModel.findOne({ cyclicSearchRequests: searchId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec();
  }

  async create(cyclicSearch: CyclicSearch): Promise<CyclicSearch> {
    const saveCyclicSearch = this.mapper.prepareForSave(cyclicSearch);
    const saved = await new this.cyclicSearchModel(saveCyclicSearch).save();
    return this.fromDoc(saved);
  }

  update(cyclicSearch: CyclicSearch): Promise<CyclicSearch> {
    const saveCyclicSearch = this.mapper.prepareForSave(cyclicSearch);
    return this.cyclicSearchModel.findOneAndUpdate(
      { cyclicId: saveCyclicSearch.cyclicId },
      saveCyclicSearch,
      { new: true })
      .map(doc => this.fromDoc(doc)).exec();
  }

  delete(cyclicId: string): Promise<CyclicSearch | null> {
    return this.cyclicSearchModel.findOneAndDelete({ cyclicId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec();
  }

  private fromDoc = (doc: CyclicSearchDocument) => this.mapper.toCyclicSearch(doc);
}
