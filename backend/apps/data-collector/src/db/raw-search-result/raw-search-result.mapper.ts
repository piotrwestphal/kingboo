import { RawSearchResult } from '../../core/model/RawSearchResult'
import { RawHotel } from '../../core/model/RawHotel'
import { RawHotelDocument } from './raw-hotel.document';
import { RawSearchResultDocument } from './raw-search-result.document';
import { Timestamp } from '@google-cloud/firestore';

export class RawSearchResultMapper {
  toDoc({
          searchId,
          searchPlaceIdentifier,
          collectingTimeSec,
          hotelsCount,
          hotels,
        }: RawSearchResult): RawSearchResultDocument {
    return {
      docId: `${searchId}_${Date.now()}`,
      searchId,
      searchPlaceIdentifier,
      collectingTimeSec,
      hotelsCount,
      hotels: hotels.map(h => this.toRawHotelDocument(h)),
      createdAt: Timestamp.now(),
    };
  }

  private toRawHotelDocument({
                               hotelId,
                               name,
                               price,
                               tax,
                               distanceFromCenter,
                               distanceFromCenterOrderIndex,
                               districtName,
                               coords,
                               rate,
                               secondaryRate,
                               secondaryRateType,
                               numberOfReviews,
                               starRating,
                               newlyAdded,
                               bonuses,
                               rooms,
                               collectedAt,
                               debug,
                             }: RawHotel): RawHotelDocument {
    return {
      hotelId,
      name,
      price,
      tax,
      distanceFromCenter,
      distanceFromCenterOrderIndex,
      districtName,
      coords,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
      debug,
    };
  }
}
