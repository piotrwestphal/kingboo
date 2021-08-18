import { ProcessingProgressRepository } from '../core/abstract/processing-progress.repository';
import { ProcessingProgressType } from '../core/processing-actvity.type';
import { ConditionalProcessingProgress } from '../core/interface/conditional-processing-progress';
import { Model } from 'mongoose';
import { ProcessingProgressDocument } from './processing-activity/processing-progress.document';
import { ProcessingProgressMapper } from './processing-activity/processing-progress.mapper';
import { ProcessingProgress } from '../core/interface/processing-progress';

export class MongoProcessingProgressRepository extends ProcessingProgressRepository {

  constructor(
    private readonly mapper: ProcessingProgressMapper,
    private readonly model: Model<ProcessingProgressDocument>,
  ) {
    super();
  }

  async create<T extends ProcessingProgressType>(processingProgress: ProcessingProgress<T>): Promise<ConditionalProcessingProgress<T>> {
    const saveProcessingProgress = this.mapper.toDoc(processingProgress)
    const saved = await new this.model(saveProcessingProgress).save()
    return this.mapper.fromDoc<T>(saved)
  }

  async findByType<T extends ProcessingProgressType>(searchId: string, type: T): Promise<ConditionalProcessingProgress<T>> {
    const found = await this.model.findOne({ searchId, type }).exec()
    return found
      ? this.mapper.fromDoc<T>(found)
      : null
  }

  async getQuantityOfType<T extends ProcessingProgressType>(searchId: string, type: T): Promise<number> {
    const found = await this.model.find({ searchId, type }).exec()
    return found?.length
      ? found.length
      : 0
  }

  async deleteMany(searchId: string): Promise<number> {
    const deleted = await this.model.deleteMany({ searchId }).exec();
    return deleted.deletedCount;
  }
}
