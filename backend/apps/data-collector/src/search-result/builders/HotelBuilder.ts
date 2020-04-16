/*import { BuilderType, BuilderWithoutNulls, ToBuilder } from '@bo/common';
import { Room } from '../interface/room';
import { HotelWithId } from '../interface/hotelWithId';

export class HotelBuilder {
    public static get = (): BuilderType<HotelWithId> =>
        (new HotelToBuilder() as ToBuilder<HotelWithId>).toBuilder()
}

@BuilderWithoutNulls
class HotelToBuilder implements HotelWithId {
    public hotelId: string = null;
    // following parameters always exist
    public name: string = null;
    public price: string = null;
    public tax: string = null;
    public distanceFromCenter: string = null;
    public districtName: string = null;
    public coords: string = null;
    public hotelLink: string = null;
    // following parameters might not be available
    public rate: string | null = null;
    public secondaryRateType: string | null = null;
    public secondaryRate: string | null = null;
    public priceWithoutDiscount: string | null = null;
    public numberOfReviews: string | null = null;
    public propertyType: string | null = null;
    public starRating: string | null = null;
    public newlyAdded: string | null = null;
    public bonuses: string[] = null;
    public rooms: Room[] = null;
}*/
