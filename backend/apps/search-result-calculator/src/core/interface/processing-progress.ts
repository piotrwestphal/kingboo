import { ProcessingProgressType } from '../processing-actvity.type';
import { HotelsSummaryData } from './hotels-summary-data';

type ConditionalValue<T> = T extends ProcessingProgressType.SUMMARY ? HotelsSummaryData : never

export interface ProcessingProgress<T extends ProcessingProgressType> {
  readonly searchId: string
  readonly type: T
  readonly data?: ConditionalValue<T>
}
