import { ProcessingProgress } from '../interface/processing-progress';
import { ProcessingProgressType } from '../processing-actvity.type';
import { HotelsSummaryData } from '../interface/hotels-summary-data';

export interface HotelsSummary extends ProcessingProgress<ProcessingProgressType.SUMMARY> {
  readonly searchId: string,
  readonly type: ProcessingProgressType.SUMMARY
  readonly data: HotelsSummaryData,
}
