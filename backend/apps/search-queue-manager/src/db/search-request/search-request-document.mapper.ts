import { SearchRequestDocument } from './search-request.document';
import { SearchRequest } from '../../core/model/SearchRequest';
import { SaveSearchRequest } from './save-search-request';
import { SearchRequestType } from '../../core/model/SearchRequestType';
import { SearchPlaceIdentifier } from '../../core/interface/search-place-identifier'
import { SearchPlaceIdentifierDocument } from './search-place-identifier.document'

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
                    collectingCount,
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
      searchPlaceIdentifier:
        searchPlaceIdentifier
          ? this.fromSearchPlaceIdentifierDoc(searchPlaceIdentifier)
          : null,
      nextSearchScheduledAt: new Date(nextSearchScheduledAt),
      collectingStartedAt: collectingStartedAt ? new Date(collectingStartedAt) : null,
      collectingFinishedAt: collectingFinishedAt ? new Date(collectingFinishedAt) : null,
      collectingCount: collectingCount ?? 0,
    });
  }

  private fromSearchPlaceIdentifierDoc({
                                         destination,
                                         destId,
                                         destType,
                                         placeIdLat,
                                         placeIdLon,
                                       }: SearchPlaceIdentifierDocument): SearchPlaceIdentifier {
    return {
      destination,
      destId,
      destType,
      placeIdLat,
      placeIdLon
    }
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
                   collectingCount,
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
      collectingCount,
    };
  }
}
