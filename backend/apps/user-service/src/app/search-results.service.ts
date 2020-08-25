import { Injectable } from '@nestjs/common';
import { SearchResultsDto } from './dto/search-results.dto';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { TopHotelsClient } from '../core/abstract/top-hotels.client';
import { SearchRequestDto, SearchResultDto, TopHotelsDto } from '@kb/model';

@Injectable()
export class SearchResultsService {

  constructor(
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly topHotelsClient: TopHotelsClient,
  ) {
  }

  async getSearchResults(): Promise<SearchResultsDto> {
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    const pendingSearchResultsDto = searchRequests.map(async (searchRequestDto) => {
      const topHotelsDto = await this.topHotelsClient.getTopHotels(searchRequestDto.searchId)
      return this.mapToSearchResult(searchRequestDto, topHotelsDto)
    })
    const searchResults = await Promise.all(pendingSearchResultsDto)
    return {
      searchResults,
    }
  }

  private mapToSearchResult({
                              searchId,
                              searchPlace,
                              searchPlaceIdentifier,
                              checkInDate,
                              checkOutDate,
                              numberOfRooms,
                              numberOfAdults,
                              childrenAgeAtCheckout,
                            }: SearchRequestDto,
                            topHotelsDto: TopHotelsDto): SearchResultDto {
    return {
      searchId,
      searchPlace,
      searchPlaceIdentifier,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      topHotels: topHotelsDto,
    }
  }
}
