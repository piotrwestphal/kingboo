import { RawSearchResult } from '../core/model/RawSearchResult';
import { RawHotel } from '../core/model/RawHotel';
import { RawHotelDocument } from './interface/raw-hotel.document';
import { RawSearchResultDocument } from './interface/raw-search-result.document';
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
                         hotelLink,
                         rate,
                         secondaryRate,
                         secondaryRateType,
                         numberOfReviews,
                         propertyType,
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
      districtName,
      coords,
      hotelLink,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      propertyType,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
      debug,
    };
  }
}
