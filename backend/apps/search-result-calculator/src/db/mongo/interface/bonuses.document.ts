import { Document } from 'mongoose';

export interface BonusesDocument extends Document {
  readonly freeCancellation: boolean;
  readonly cancelLater: boolean;
  readonly noPrepayment: boolean;
  readonly breakfastIncluded: boolean;
}
