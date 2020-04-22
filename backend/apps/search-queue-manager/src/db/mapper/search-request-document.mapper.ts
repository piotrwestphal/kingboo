import { SearchRequestDocument } from '../interface/search-request.document';
import { SearchRequest } from '../../core/model/SearchRequest';
import { SaveSearchRequest } from '../interface/save-search-request';

export class SearchRequestDocumentMapper {
  static toSearchRequest({
                           searchId,
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
