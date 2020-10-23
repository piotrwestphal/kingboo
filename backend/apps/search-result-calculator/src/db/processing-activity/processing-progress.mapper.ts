import { SaveProcessingProgress } from './save-processing-progress';
import { ProcessingProgress } from '../../core/interface/processing-progress';
import { ConditionalProcessingProgress } from '../../core/interface/conditional-processing-progress';
import { ProcessingProgressDocument } from './processing-progress.document';
import { ProcessingProgressType } from '../../core/processing-actvity.type';

export class ProcessingProgressMapper {
  fromDoc<T extends ProcessingProgressType>({
                                              searchId,
                                              type,
                                              data,
                                            }: ProcessingProgressDocument): ConditionalProcessingProgress<T> {
    return {
      searchId,
      type,
      data,
    } as ConditionalProcessingProgress<T>
  }

  toDoc<T extends ProcessingProgressType>({
             searchId,
             type,
             data,
           }: ProcessingProgress<T>): SaveProcessingProgress {
    return {
      searchId,
      type,
      data,
    }
  }
}
