import { ProcessingProgressType } from '../processing-actvity.type';
import { HotelsSummary } from '../model/HotelsSummary';
import { HotelsPart } from '../model/HotelsPart';

export type ConditionalProcessingProgress<T extends ProcessingProgressType> = T extends ProcessingProgressType.SUMMARY ? HotelsSummary : HotelsPart
