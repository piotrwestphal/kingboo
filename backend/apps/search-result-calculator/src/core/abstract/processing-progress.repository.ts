import { ProcessingProgressType } from '../processing-actvity.type';
import { ConditionalProcessingProgress } from '../interface/conditional-processing-progress';
import { ProcessingProgress } from '../interface/processing-progress';


export abstract class ProcessingProgressRepository {
  abstract create<T extends ProcessingProgressType>(processingProgress: ProcessingProgress<T>): Promise<ConditionalProcessingProgress<T> | null>

  abstract findByType<T extends ProcessingProgressType>(searchId: string, type: T): Promise<ConditionalProcessingProgress<T>>

  abstract getQuantityOfType<T extends ProcessingProgressType>(searchId: string, type: T): Promise<number>

  abstract deleteMany(searchId: string): Promise<number>
}
