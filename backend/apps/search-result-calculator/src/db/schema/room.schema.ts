import { Schema } from 'mongoose';
import { RoomDocument } from '../interface/room.document';
import { BonusesSchema } from './bonuses.schema';

export const RoomSchema = new Schema<RoomDocument>({
    shortDescription: String,
    longDescription: String,
    personCount: String,
    beds: String,
    bonuses: BonusesSchema,
  },
  {
    _id: false,
    versionKey: false,
  });
