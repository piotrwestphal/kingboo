import { CyclicSearchRepository } from '../core/abstract/cyclic-search.repository'
import { CyclicSearch } from '../core/model/CyclicSearch'
import { Model } from 'mongoose'
import { CyclicSearchDocument } from './cyclic-search/cyclic-search.document'
import { CyclicSearchDocumentMapper } from './cyclic-search/cyclic-search-document.mapper'

export class MongoCyclicSearchRepository extends CyclicSearchRepository {

  constructor(
    private readonly mapper: CyclicSearchDocumentMapper,
    private readonly model: Model<CyclicSearchDocument>,
  ) {
    super()
  }

  async findAll(): Promise<CyclicSearch[]> {
    const found = await this.model.find({}).exec()
    return found.map(doc => this.fromDoc(doc))
  }

  findByCyclicId(cyclicId: string): Promise<CyclicSearch> {
    return this.model.findOne({ cyclicId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec()
  }

  findByCyclicSearchRequest(searchId: string): Promise<CyclicSearch | null> {
    return this.model.findOne({ cyclicSearchRequests: searchId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec()
  }

  async create(cyclicSearch: CyclicSearch): Promise<CyclicSearch> {
    const saveCyclicSearch = this.mapper.prepareForSave(cyclicSearch)
    const saved = await new this.model(saveCyclicSearch).save()
    return this.fromDoc(saved)
  }

  async update(cyclicSearch: CyclicSearch): Promise<CyclicSearch> {
    const saveCyclicSearch = this.mapper.prepareForSave(cyclicSearch)
    const found = await this.model.findOneAndUpdate(
      { cyclicId: saveCyclicSearch.cyclicId },
      saveCyclicSearch,
      { new: true })
      .exec()
    return this.fromDoc(found)
  }

  delete(cyclicId: string): Promise<CyclicSearch | null> {
    return this.model.findOneAndDelete({ cyclicId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec()
  }

  private fromDoc = (doc: CyclicSearchDocument) => this.mapper.toCyclicSearch(doc)
}
