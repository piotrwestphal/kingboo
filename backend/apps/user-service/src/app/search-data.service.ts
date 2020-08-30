import { Injectable } from '@nestjs/common';
import { SearchDataPayload } from './dto/search-data.payload';
import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { HotelsClient } from '../core/abstract/hotels.client';
import { SearchRequestDto, SearchDataDto, TopHotelsDto } from '@kb/model';

@Injectable()
export class SearchDataService {

  constructor(
    private readonly searchRequestsClient: SearchRequestsClient,
    private readonly hotelsClient: HotelsClient,
  ) {
  }

  async getSearchData(): Promise<SearchDataPayload> {
    const searchRequests = await this.searchRequestsClient.getSearchRequests()
    const pendingSearchResultsDto = searchRequests.map(async (searchRequestDto) => {
      const topHotelsDto = await this.hotelsClient.getTopHotels(searchRequestDto.searchId)
      return this.mapToSearchData(searchRequestDto, topHotelsDto)
    })
    const searchDataList = await Promise.all(pendingSearchResultsDto)
    return {
      searchDataList,
    }
  }

  private mapToSearchData({
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
                            topHotelsDto?: TopHotelsDto): SearchDataDto {
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
