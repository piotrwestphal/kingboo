import { RawSearchResult } from '../../core/model/RawSearchResult';
import { RawHotel } from '../../core/model/RawHotel';
import { RawHotelDocument } from './raw-hotel.document';
import { RawSearchResultDocument } from './raw-search-result.document';
import { Timestamp } from '@google-cloud/firestore';

export class RawSearchResultMapper {
  fromRawSearchResult({
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
      hotels: hotels.map(h => this.fromRawHotel(h)),
      createdAt: Timestamp.now(),
    };
  }

  private fromRawHotel({
                         hotelId,
                         name,
                         price,
                         tax,
                         distanceFromCenter,
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
                       }: RawHotel): RawHotelDocument {
    return {
      hotelId,
      name,
      price,
      tax,
      distanceFromCenter,
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
    };
  }
}
