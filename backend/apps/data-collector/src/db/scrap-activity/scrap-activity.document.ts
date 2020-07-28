import { SaveScrapActivity } from './save-scrap-activity';
import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface ScrapActivityDocument extends SaveScrapActivity, Document {
  readonly _id: ObjectId;
}
