import { ProcessingProgressType } from '../processing-actvity.type';
import { ConditionalProcessingProgress } from '../interface/conditional-processing-progress';
import { ProcessingProgress } from '../interface/processing-progress';


export abstract class ProcessingProgressRepository {
  abstract async create<T extends ProcessingProgressType>(processingProgress: ProcessingProgress<T>): Promise<ConditionalProcessingProgress<T> | null>

  abstract async findByType<T extends ProcessingProgressType>(searchId: string, type: T): Promise<ConditionalProcessingProgress<T>>

  abstract async getQuantityOfType<T extends ProcessingProgressType>(searchId: string, type: T): Promise<number>

  abstract async deleteMany(searchId: string): Promise<number>
}
