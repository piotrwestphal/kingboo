import { SearchRequestDocument } from '../interface/searchRequest.document';
import { SearchRequest } from '../../core/model/SearchRequest';

export class SearchRequestDocumentMapper {
  static toSearchRequest({
                           searchId,
                           priority,
                           updateFrequencyMinutes,
                           resultsLimit,
                           searchPlace,
                           checkInDate: checkInDayDoc,
                           checkOutDate: checkOutDayDoc,
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
      checkInDate: {
        day: checkInDayDoc.day,
        month: checkInDayDoc.month,
        year: checkInDayDoc.year,
      },
      checkOutDate: {
        day: checkOutDayDoc.day,
        month: checkOutDayDoc.month,
        year: checkOutDayDoc.year,
      },
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      occupancyStatus,
      occupancyUpdatedAt: new Date(occupancyUpdatedAt),
    });
  }
}
