import { ProcessingProgressType } from '../../core/processing-actvity.type';

export interface SaveProcessingProgress {
  readonly searchId: string
  readonly type: ProcessingProgressType
  readonly expectedNumberOfParts?: number
}
