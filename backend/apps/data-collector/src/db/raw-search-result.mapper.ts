import { RawSearchResult } from '../core/model/RawSearchResult';
import { RawHotel } from '../core/model/RawHotel';
import { RawHotelDocument } from './raw-search-result/raw-hotel.document';
import { RawSearchResultDocument } from './raw-search-result/raw-search-result.document';

export class RawSearchResultMapper {
  fromRawSearchResult({
                        searchId,
                        searchPlaceIdentifier,
                        collectingTimeSec,
                        hotelsCount,
                        hotels,
                      }: RawSearchResult): RawSearchResultDocument {
    return {
      searchId,
      searchPlaceIdentifier,
      collectingTimeSec,
      hotelsCount,
      hotels: hotels.map(h => this.fromRawHotel(h)),
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
