import { ProcessingProgress } from '../interface/processing-progress';
import { ProcessingProgressType } from '../processing-actvity.type';

export interface HotelsPart extends ProcessingProgress<ProcessingProgressType.PART> {
  readonly searchId: string,
  readonly type: ProcessingProgressType.PART
}
