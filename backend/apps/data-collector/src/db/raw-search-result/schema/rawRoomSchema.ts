import { Schema } from 'mongoose';
import { RawRoomDocument } from '..';

export const RawRoomSchema = new Schema<RawRoomDocument>({
    description: String,
    personCount: String,
    beds: String,
    bonuses: [String],
  },
  {
    _id: false,
    versionKey: false,
  });
