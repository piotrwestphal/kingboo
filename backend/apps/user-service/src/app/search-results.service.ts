import { Injectable } from '@nestjs/common';
import { SearchResultsDto } from './dto/search-results.dto';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { HotelsClient } from '../core/abstract/hotels.client';
import { SearchRequestDto, SearchResultDto, TopHotelsDto } from '@kb/model';

@Injectable()
export class SearchResultsService {

  constructor(
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly hotelsClient: HotelsClient,
  ) {
  }

  async getSearchResults(): Promise<SearchResultsDto> {
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    const pendingSearchResultsDto = searchRequests.map(async (searchRequestDto) => {
      const topHotelsDto = await this.hotelsClient.getTopHotels(searchRequestDto.searchId)
      return this.mapToSearchResult(searchRequestDto, topHotelsDto)
    })
    const searchResults = await Promise.all(pendingSearchResultsDto)
    return {
      searchResults,
    }
  }

  private mapToSearchResult({
                              searchId,
                              type,
                              searchPlace,
                              searchPlaceIdentifier,
                              checkInDate,
                              checkOutDate,
                              numberOfRooms,
                              numberOfAdults,
                              childrenAgeAtCheckout,
                              updateFrequencyMinutes,
                              priority,
                              resultsLimit,
                            }: SearchRequestDto,
                            topHotelsDto?: TopHotelsDto): SearchResultDto {
    return {
      searchId,
      type,
      searchPlace,
      searchPlaceIdentifier,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      updateFrequencyMinutes,
      priority,
      resultsLimit,
      topHotels: topHotelsDto,
    }
  }
}
