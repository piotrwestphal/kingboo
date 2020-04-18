import { RawHotel } from './RawHotel';

export class RawSearchResult {

  public hotelsCount: number;
  public searchPlaceIdentifier: string;
  public collectingTimeSec;

  constructor(
    public readonly searchId: string,
    public readonly hotels: RawHotel[] = [],
  ) {
  }

  setSearchPlaceIdentifier(searchPlaceIdentifier: string) {
    this.searchPlaceIdentifier = searchPlaceIdentifier;
  }

  addHotelsAfterCollectingFinish(rawHotels: RawHotel[]) {
    this.hotels.push(...rawHotels);
    this.hotelsCount = this.hotels.length;
  }

  setCollectingTime(collectingTimeSec: number) {
    this.collectingTimeSec = collectingTimeSec;
  }
}
