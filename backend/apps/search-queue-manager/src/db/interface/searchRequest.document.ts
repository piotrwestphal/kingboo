import { Document } from 'mongoose';
import { CheckDateDocument } from './checkDate.document';
import { ObjectId } from 'bson';
import { TimestampsDocument } from '@kb/mongo/interface/timestamps.document';

export interface SearchRequestDocument extends Document, TimestampsDocument {
  readonly _id: ObjectId;

  readonly searchId: string;
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
  // Scenario parameters
  readonly searchPlace: string;
  readonly checkInDate: CheckDateDocument;
  readonly checkOutDate: CheckDateDocument;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];

  readonly searchPlaceIdentifier: string;
  readonly occupancyStatus: string;
  readonly occupancyUpdatedAt: string;
}
