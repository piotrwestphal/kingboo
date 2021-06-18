import { RawHotel } from '../../core/interface/raw-hotel';
import { Hotel } from '../../core/model/Hotel';

export class HotelFactory {
  createNew({
              searchId,
              hotelId,
              name,
              price,
              distanceFromCenterMeters,
              distanceFromCenterOrderIndex,
              districtName,
              coords,
              hotelLink,
              roomName,
              rate,
              secondaryRate,
              secondaryRateType,
              numberOfReviews,
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
      coords,
      [{
        price,
        room: roomName,
        changedAt: collectedAt,
        occurrenceCount: 1,
      }],
      [collectedAt],
      {
        price,
        districtName,
        distanceFromCenterMeters,
        distanceFromCenterOrderIndex,
        hotelLink,
        roomName,
        rate,
        secondaryRate,
        secondaryRateType,
        numberOfReviews,
        newlyAdded,
        starRating,
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
      collectedAt,
      1,
    );
  }
}
