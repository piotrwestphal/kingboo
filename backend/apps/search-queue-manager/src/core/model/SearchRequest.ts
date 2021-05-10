import { InconsistencyException } from '../exception/InconsistencyException'
import { SearchRequestType } from './SearchRequestType'
import { SearchPlaceIdentifier } from '../interface/search-place-identifier'
import { TimeHelper } from '@kb/util'

type SearchRequestValues = Omit<SearchRequest,
  'updateSearchPlaceIdentifier'
  | 'scheduleNextSearch'
  | 'finishCollecting'>

export class SearchRequest {

  private constructor(
    public readonly searchId: string,
    public readonly type: SearchRequestType,
    public readonly updateFrequencyMinutes: number,
    public readonly resultsLimit: number,
    public readonly searchPlace: string,
    public readonly checkInDate: Date,
    public readonly checkOutDate: Date,
    public readonly numberOfRooms: number,
    public readonly numberOfAdults: number,
    public readonly childrenAgeAtCheckout: number[],
    public searchPlaceIdentifier: SearchPlaceIdentifier | null,
    public nextSearchScheduledAt: Date,
    public collectingStartedAt: Date | null,
    public collectingFinishedAt: Date | null,
    public collectingCount: number,
  ) {
  }

  static create({
                  searchId,
                  type,
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
                  collectingStartedAt,
                  collectingFinishedAt,
                  collectingCount,
                }: SearchRequestValues): SearchRequest {
    return new SearchRequest(
      searchId,
      type,
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
      collectingStartedAt,
      collectingFinishedAt,
      collectingCount,
    )
  }

  scheduleNextSearch(now: Date): SearchRequest {
    const minutesToAdd = this.updateFrequencyMinutes * TimeHelper.MINUTE_IN_MS;
    this.nextSearchScheduledAt = new Date(now.valueOf() + minutesToAdd);
    return this;
  }

  updateSearchPlaceIdentifier(searchPlaceIdentifier: SearchPlaceIdentifier): SearchRequest {
    if (this.searchPlaceIdentifier) {
      throw new InconsistencyException(`Search place identifier for searchId [${this.searchId}] already exists`);
    }
    this.searchPlaceIdentifier = searchPlaceIdentifier;
    return this;
  }

  finishCollecting(collectingStartedAt: string, collectingFinishedAt: string): SearchRequest {
    this.collectingStartedAt = new Date(collectingStartedAt);
    this.collectingFinishedAt = new Date(collectingFinishedAt);
    this.collectingCount = ++this.collectingCount;
    return this;
  }
}
