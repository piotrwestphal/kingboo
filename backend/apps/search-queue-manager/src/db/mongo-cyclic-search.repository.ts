import { CyclicSearchRepository } from '../core/abstract/cyclic-search.repository';
import { CyclicSearch } from '../core/model/CyclicSearch';
import { Model } from 'mongoose';
import { CyclicSearchDocument } from './cyclic-search/cyclic-search.document';
import { CyclicSearchDocumentMapper } from './cyclic-search/cyclic-search-document.mapper';

export class MongoCyclicSearchRepository extends CyclicSearchRepository {

  constructor(
    private readonly mapper: CyclicSearchDocumentMapper,
    private readonly model: Model<CyclicSearchDocument>,
  ) {
    super();
  }

  findAll(): Promise<CyclicSearch[]> {
    return this.model.find({})
      .map(docs => docs.map(doc => this.fromDoc(doc)))
      .exec();
  }

  findByCyclicId(cyclicId: string): Promise<CyclicSearch> {
    return this.model.findOne({ cyclicId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec();
  }

  findByCyclicSearchRequest(searchId: string): Promise<CyclicSearch | null> {
    return this.model.findOne({ cyclicSearchRequests: searchId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec();
  }

  async create(cyclicSearch: CyclicSearch): Promise<CyclicSearch> {
    const saveCyclicSearch = this.mapper.prepareForSave(cyclicSearch);
    const saved = await new this.model(saveCyclicSearch).save();
    return this.fromDoc(saved);
  }

  update(cyclicSearch: CyclicSearch): Promise<CyclicSearch> {
    const saveCyclicSearch = this.mapper.prepareForSave(cyclicSearch);
    return this.model.findOneAndUpdate(
      { cyclicId: saveCyclicSearch.cyclicId },
      saveCyclicSearch,
      { new: true })
      .map(doc => this.fromDoc(doc)).exec();
  }

  delete(cyclicId: string): Promise<CyclicSearch | null> {
    return this.model.findOneAndDelete({ cyclicId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec();
  }

  private fromDoc = (doc: CyclicSearchDocument) => this.mapper.toCyclicSearch(doc);
}
