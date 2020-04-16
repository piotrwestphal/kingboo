import { RawHotel } from './RawHotel';

export class RawSearchResult {

  public hotelsCount: number;

  constructor(
    public readonly searchId: string,
    public readonly searchPlace: string,
    public collectingTimeSec = 0,
    public readonly hotels: RawHotel[] = [],
  ) {
  }

  addHotelsAfterCollectingFinish(rawHotels: RawHotel[]) {
    this.hotels.push(...rawHotels);
    this.hotelsCount = this.hotels.length;
  }

  setCollectingTime(collectingTimeSec: number) {
    this.collectingTimeSec = collectingTimeSec;
  }
}
