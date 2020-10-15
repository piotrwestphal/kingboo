import { ProcessingProgressType } from '../processing-actvity.type';

type ConditionalValue<T> = T extends ProcessingProgressType.SUMMARY ? number : never

export interface ProcessingProgress<T extends ProcessingProgressType> {
  readonly searchId: string
  readonly type: T
  readonly expectedNumberOfParts?: ConditionalValue<T>
}
