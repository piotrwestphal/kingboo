import { RawHotel } from './RawHotel';

export class RawSearchResult {

  constructor(
    public readonly searchId: string,
    public readonly searchPlaceIdentifier: string,
    public readonly hotels: RawHotel[] = [],
    public hotelsCount: number = 0,
    public collectingTimeSec: number = null,
  ) {
  }

  addHotelsAfterCollectingFinish(rawHotels: RawHotel[]): void {
    this.hotels.push(...rawHotels);
    this.hotelsCount = this.hotels.length;
  }

  setCollectingTime(collectingTimeSec: number): void {
    this.collectingTimeSec = collectingTimeSec;
  }
}
