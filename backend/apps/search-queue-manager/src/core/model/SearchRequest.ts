import { OccupancyStatus } from './OccupancyStatus';
import { InconsistencyException } from '../exception/InconsistencyException';
import { SearchRequestType } from './SearchRequestType';

type SearchRequestValues = Omit<SearchRequest, 'updateSearchPlaceIdentifier' | 'block' | 'unblock'>

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
    public occupancyStatus: string,
    public occupancyUpdatedAt: Date,
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
                  occupancyStatus,
                  occupancyUpdatedAt,
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
      occupancyStatus,
      occupancyUpdatedAt,
    );
  }

  updateSearchPlaceIdentifier(searchPlaceIdentifier: string): SearchRequest {
    if (this.searchPlaceIdentifier) {
      throw new InconsistencyException(`Search place identifier already exists`);
    }
    this.searchPlaceIdentifier = searchPlaceIdentifier;
    return this;
  }

  unblock(): SearchRequest {
    if (this.occupancyStatus === OccupancyStatus.FREE) {
      throw new InconsistencyException(`Search request is already ${OccupancyStatus.FREE}`);
    }
    this.occupancyStatus = OccupancyStatus.FREE;
    this.occupancyUpdatedAt = new Date();
    return this;
  }

  block(): SearchRequest {
    if (this.occupancyStatus === OccupancyStatus.BUSY) {
      throw new InconsistencyException(`Search request is already ${OccupancyStatus.BUSY}`);
    }
    this.occupancyStatus = OccupancyStatus.BUSY;
    this.occupancyUpdatedAt = new Date();
    return this;
  }
}
