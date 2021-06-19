import { RawRoom } from './RawRoom';

export class RawHotel {
  constructor(
    public readonly hotelId: string,
    public readonly name: string,
    public readonly price: string | null,
    public readonly tax: string | null,
    public readonly distanceFromCenter: string,
    public readonly distanceFromCenterOrderIndex: number,
    public readonly districtName: string,
    public readonly coords: string,
    public readonly hotelLink: string,
    public readonly roomName: string | null,
    public readonly rate: string | null,
    public readonly secondaryRate: string | null,
    public readonly secondaryRateType: string | null,
    public readonly numberOfReviews: string | null,
    public readonly starRating: number | null,
    public readonly newlyAdded: string | null,
    public readonly bonuses: string[] | null,
    public readonly rooms: RawRoom[] | null,
    public readonly collectedAt: string,
    public readonly debug: string = null,
  ) {
  }
}
