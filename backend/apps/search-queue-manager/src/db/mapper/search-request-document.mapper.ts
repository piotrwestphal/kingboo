import { SearchRequestDocument } from '../interface/search-request.document';
import { SearchRequest } from '../../core/model/SearchRequest';
import { BaseSearchRequestDocument } from '../interface/base-search-request.document';
import { CheckDate } from '../../core/model/CheckDate';

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
      checkInDate: {
        day: checkInDate.getDate(),
        month: checkInDate.getMonth() + 1,
        year: checkInDate.getFullYear(),
      },
      checkOutDate: {
        day: checkOutDate.getDate(),
        month: checkOutDate.getMonth() + 1,
        year: checkOutDate.getFullYear(),
      },
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      occupancyStatus,
      occupancyUpdatedAt: new Date(occupancyUpdatedAt),
    });
  }

  toBase({
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
         }: SearchRequest): BaseSearchRequestDocument {
    return {
      searchId,
      priority,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      checkInDate: this.mapCheckDate(checkInDate),
      checkOutDate: this.mapCheckDate(checkOutDate),
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      occupancyStatus,
      occupancyUpdatedAt: occupancyUpdatedAt,
    };
  }

  mapCheckDate = ({ year, month, day }: CheckDate): Date => new Date(year, (month - 1), day);
}
