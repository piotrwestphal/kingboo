import { RawRoom } from './RawRoom';

export class RawHotel {

  public readonly hotelId: string;

  constructor(
    public readonly name: string,
    public readonly price: string,
    public readonly tax: string,
    public readonly distanceFromCenter: string,
    public readonly districtName: string,
    public readonly coords: string,
    public readonly hotelLink: string,
    public readonly rate: string | null,
    public readonly secondaryRate: string | null,
    public readonly secondaryRateType: string | null,
    public readonly numberOfReviews: string | null,
    public readonly starRating: number | null,
    public readonly newlyAdded: string | null,
    public readonly bonuses: string[] | null,
    public readonly rooms: RawRoom[] | null,
    public readonly collectedAt: string,
  ) {
    this.hotelId = this.assignHotelId(name, coords);
  }

  private assignHotelId = (name: string, coords: string) => {
    return Buffer.from(`${name}${coords ? coords : ''}`)
      .toString('base64');
  };
}
