import {Document} from 'mongoose';

export interface CheckDateDocument extends Document {
    readonly year: number;
    readonly month: number;
    readonly day: number;
}
