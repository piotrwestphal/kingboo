import { SearchRequest } from '../core/model/SearchRequest';
import { SearchIdentifierBuilder } from '../core/search-identifier.builder';
import { OccupancyStatus } from '../core/model/OccupancyStatus';
import { CreateSearchRequest } from '../core/interface/create-search-request';
import { CheckDate } from '../core/interface/check-date';

export class SearchRequestFactory {

  constructor(
    private readonly searchIdentifierBuilder: SearchIdentifierBuilder,
  ) {
  }

  // TODO add validation here
  createNew(createSearchRequest: CreateSearchRequest): SearchRequest {
    return SearchRequest.create({
      ...createSearchRequest,
      checkInDate: this.mapCheckDate(createSearchRequest.checkInDate),
      checkOutDate: this.mapCheckDate(createSearchRequest.checkOutDate),
      searchId: this.searchIdentifierBuilder.createIdentifier(createSearchRequest),
      searchPlaceIdentifier: null,
      occupancyStatus: OccupancyStatus.BUSY,
      occupancyUpdatedAt: new Date(),
    });
  }

  private mapCheckDate = ({ year, month, day }: CheckDate): Date => new Date(year, (month - 1), day);
}
