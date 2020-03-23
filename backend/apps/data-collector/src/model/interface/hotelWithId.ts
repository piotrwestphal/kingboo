import { Room } from './room';

export interface HotelWithId {
    hotelId: string;
    // following parameters always exist
    name: string;
    price: string;
    tax: string;
    distanceFromCenter: string;
    districtName: string;
    coords: string;
    hotelLink: string;
    // following parameters might not be available
    rate: string | null;
    secondaryRateType: string | null;
    secondaryRate: string | null;
    priceWithoutDiscount: string | null;
    numberOfReviews: string | null;
    propertyType: string | null;
    starRating: string | null;
    newlyAdded: string | null;
    bonuses: string[];
    rooms: Room[];
}
