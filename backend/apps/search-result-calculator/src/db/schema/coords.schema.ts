import { Schema } from 'mongoose';
import { HotelDocument } from '../interface/hotel.document';

export const CoordsSchema = new Schema<HotelDocument>({
    lat: Number,
    lon: Number,
  },
  {
    _id: false,
    versionKey: false,
  });
