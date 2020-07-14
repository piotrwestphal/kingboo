import { SearchRequestDocument } from './search-request.document';
import { SearchRequest } from '../../core/model/SearchRequest';
import { SaveSearchRequest } from './save-search-request';
import { SearchRequestType } from '../../core/model/SearchRequestType';

export class SearchRequestDocumentMapper {
  toSearchRequest({
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
                         }: SearchRequestDocument): SearchRequest {
    return SearchRequest.create({
      searchId,
      type: type as SearchRequestType,
      priority,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      occupancyStatus,
      occupancyUpdatedAt: new Date(occupancyUpdatedAt),
    });
  }

  prepareForSave({
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
                 }: SearchRequest): SaveSearchRequest {
    return {
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
    };
  }
}
