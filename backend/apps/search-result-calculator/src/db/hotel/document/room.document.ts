import { Document } from 'mongoose';
import { BonusesDocument } from './bonuses.document';

export interface RoomDocument extends Document {
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly personCount: string;
  readonly beds: string;
  readonly bonuses: BonusesDocument;
}
