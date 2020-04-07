import { SearchRequest } from '../core/model/SearchRequest';
import { SearchIdentifierBuilder } from '../core/search-identifier.builder';
import { OccupancyStatus } from '../core/model/OccupancyStatus';
import { CreateSearchRequest } from '../core/interface/create-search-request';

export class SearchRequestFactory {

  constructor(
    private readonly searchIdentifierBuilder: SearchIdentifierBuilder,
  ) {
  }

  createNew(createSearchRequest: CreateSearchRequest): SearchRequest {
    return SearchRequest.create({
      ...createSearchRequest,
      searchId: this.searchIdentifierBuilder.createIdentifier(createSearchRequest),
      searchPlaceIdentifier: null,
      occupancyStatus: OccupancyStatus.BUSY,
      occupancyUpdatedAt: new Date(),
    });
  }
}
