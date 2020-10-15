import { ProcessingProgress } from './ProcessingProgress';
import { ProcessingProgressType } from '../processing-actvity.type';

export interface HotelsSummary extends ProcessingProgress<ProcessingProgressType.SUMMARY> {
  readonly searchId: string,
  readonly type: ProcessingProgressType.SUMMARY
  readonly expectedNumberOfParts: number,
}
