import { InconsistencyException } from '../exception/InconsistencyException';
import { SearchRequestType } from './SearchRequestType';

type SearchRequestValues = Omit<SearchRequest, 'updateSearchPlaceIdentifier' | 'scheduleNextSearch'>

export class SearchRequest {

  private constructor(
    public readonly searchId: string,
    public readonly type: SearchRequestType,
    public readonly priority: number,
    public readonly updateFrequencyMinutes: number,
    public readonly resultsLimit: number,
    public readonly searchPlace: string,
    public readonly checkInDate: Date,
    public readonly checkOutDate: Date,
    public readonly numberOfRooms: number,
    public readonly numberOfAdults: number,
    public readonly childrenAgeAtCheckout: number[],
    public searchPlaceIdentifier: string | null,
    public nextSearchScheduledAt: Date,
  ) {
  }

  static create({
                  searchId,
                  type,
                  priority,
                  updateFrequencyMinutes,
                  resultsLimit,
                  searchPlace,
                  checkInDate,
                  checkOutDate,
                  numberOfRooms,
                  numberOfAdults,
                  childrenAgeAtCheckout,
                  searchPlaceIdentifier,
                  nextSearchScheduledAt,
                }: SearchRequestValues): SearchRequest {
    return new SearchRequest(
      searchId,
      type,
      priority,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      nextSearchScheduledAt,
    );
  }

  scheduleNextSearch(now: Date): SearchRequest {
    const minutesToAdd = this.updateFrequencyMinutes * 60000;
    this.nextSearchScheduledAt = new Date(now.valueOf() + minutesToAdd);
    return this;
  }

  updateSearchPlaceIdentifier(searchPlaceIdentifier: string): SearchRequest {
    if (this.searchPlaceIdentifier) {
      throw new InconsistencyException(`Search place identifier already exists`);
    }
    this.searchPlaceIdentifier = searchPlaceIdentifier;
    return this;
  }
}
