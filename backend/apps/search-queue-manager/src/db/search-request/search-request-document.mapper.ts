import { SearchRequestDocument } from './search-request.document';
import { SearchRequest } from '../../core/model/SearchRequest';
import { SaveSearchRequest } from './save-search-request';
import { SearchRequestType } from '../../core/model/SearchRequestType';

export class SearchRequestDocumentMapper {
  toSearchRequest({
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
                  }: SearchRequestDocument): SearchRequest {
    return SearchRequest.create({
      searchId,
      type: type as SearchRequestType,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      nextSearchScheduledAt: new Date(nextSearchScheduledAt),
      collectingStartedAt: collectingStartedAt ? new Date(collectingStartedAt) : null,
      collectingFinishedAt: collectingFinishedAt ? new Date(collectingFinishedAt) : null,
    });
  }

  prepareForSave({
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
                 }: SearchRequest): SaveSearchRequest {
    return {
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
    };
  }
}
