import { Document } from 'mongoose';
import { ObjectId } from 'bson';
import { SaveProcessingProgress } from './save-processing-progress';

export interface ProcessingProgressDocument extends SaveProcessingProgress, Document {
  readonly _id: ObjectId
}
