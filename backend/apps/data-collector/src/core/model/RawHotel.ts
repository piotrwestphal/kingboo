import { RawRoom } from './RawRoom';

export class RawHotel {

  public readonly hotelId: string;

  constructor(
    // following parameters always exist
    public readonly name: string,
    public readonly price: string,
    public readonly tax: string,
    public readonly distanceFromCenter: string,
    public readonly districtName: string,
    public readonly coords: string,
    public readonly hotelLink: string,
    // following parameters might not be available
    public readonly rate: string | null,
    public readonly secondaryRate: string | null,
    public readonly secondaryRateType: string | null,
    public readonly numberOfReviews: string | null,
    public readonly propertyType: string | null,
    public readonly starRating: string | null,
    public readonly newlyAdded: string | null,
    public readonly bonuses: string[] | null,
    public readonly rooms: RawRoom[] | null,
  ) {
    this.hotelId = this.assignHotelId(name, coords);
  }

  private assignHotelId = (name: string, coords: string) => {
    return Buffer.from(`${name}${coords ? coords : ''}`)
      .toString('base64');
  };
}
