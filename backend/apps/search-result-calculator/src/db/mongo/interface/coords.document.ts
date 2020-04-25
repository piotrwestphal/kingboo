import { Document } from 'mongoose';

export interface CoordsDocument extends Document {
  readonly lat: number;
  readonly lon: number;
}
