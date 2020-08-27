import { RawHotel } from '../../core/interface/raw-hotel';
import { Hotel } from '../../core/model/hotel';

export class HotelFactory {
  createNew({
            searchId,
            hotelId,
            name,
            price,
            distanceFromCenterMeters,
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
          }: RawHotel): Hotel {
    return new Hotel(
      searchId,
      hotelId,
      name,
      distanceFromCenterMeters,
      districtName,
      coords,
      hotelLink,
      propertyType,
      starRating,
      [collectedAt],
      [{
        value: price,
        changedAt: collectedAt,
        occurrenceCount: 1,
      }],
      {
        price,
        rate,
        secondaryRate,
        secondaryRateType,
        numberOfReviews,
        newlyAdded,
        bonuses,
        rooms,
      },
      {
        avgPrice: price,
        minPrice: price,
        maxPrice: price,
        avgPriceDiff: 0,
        maxPriceDiff: 0,
        priceRate: 0,
      },
    );
  }
}
