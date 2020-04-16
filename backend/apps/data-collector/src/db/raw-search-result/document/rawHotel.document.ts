import {Document} from 'mongoose';
import {RawRoomDocument} from './rawRoom.document';

export interface RawHotelDocument extends Document {
    readonly hotelId: string;
    // following parameters always exist
    readonly name: string;
    readonly price: string;
    readonly tax: string;
    readonly distanceFromCenter: string;
    readonly districtName: string;
    readonly coords: string;
    readonly hotelLink: string;
    // following parameters might not be available
    readonly rate: string | null;
    readonly secondaryRateType: string | null;
    readonly secondaryRate: string | null;
    readonly priceWithoutDiscount: string | null;
    readonly numberOfReviews: string | null;
    readonly propertyType: string | null;
    readonly starRating: string | null;
    readonly newlyAdded: string | null;
    readonly bonuses: string[] | null;
    readonly rooms: RawRoomDocument[] | null;
}
