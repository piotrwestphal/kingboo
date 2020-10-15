import { SaveProcessingProgress } from './save-processing-progress';
import { ProcessingProgress } from '../../core/model/ProcessingProgress';
import { ConditionalProcessingProgress } from '../../core/interface/conditional-processing-progress';
import { ProcessingProgressDocument } from './processing-progress.document';
import { ProcessingProgressType } from '../../core/processing-actvity.type';

export class ProcessingProgressMapper {
  fromDoc<T extends ProcessingProgressType>({
                                              searchId,
                                              type,
                                              expectedNumberOfParts,
                                            }: ProcessingProgressDocument): ConditionalProcessingProgress<T> {
    return {
      searchId,
      type,
      expectedNumberOfParts,
    } as ConditionalProcessingProgress<T>
  }

  toDoc<T extends ProcessingProgressType>({
             searchId,
             type,
             expectedNumberOfParts,
           }: ProcessingProgress<T>): SaveProcessingProgress {
    return {
      searchId,
      type,
      expectedNumberOfParts,
    }
  }
}
