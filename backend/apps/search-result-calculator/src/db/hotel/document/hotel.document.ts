import { Document } from 'mongoose';
import { SaveHotel } from '../save-hotel';

export interface HotelDocument extends SaveHotel, Document {
}
