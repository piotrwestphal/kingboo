import { SaveScrapActivity } from './save-scrap-activity';
import { Document } from "mongoose";
import { TimestampsDocument } from '@kb/mongo';
import { ObjectId } from 'bson';

export interface ScrapActivityDocument extends SaveScrapActivity, Document, TimestampsDocument {
  readonly _id: ObjectId;
}
