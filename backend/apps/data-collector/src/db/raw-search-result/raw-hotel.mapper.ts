import { RawHotel } from '../../core/model/RawHotel'
import { RawHotelDocument } from './raw-hotel.document'

export class RawHotelMapper {
  toDoc({
          hotelId,
          name,
          price,
          tax,
          distanceFromCenter,
          distanceFromCenterOrderIndex,
          districtName,
          coords,
          hotelLink,
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
      hotelLink,
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
    }
  }

  fromDoc({
            hotelId,
            name,
            price,
            tax,
            distanceFromCenter,
            distanceFromCenterOrderIndex,
            districtName,
            coords,
            hotelLink,
            rate,
            secondaryRateType,
            secondaryRate,
            numberOfReviews,
            starRating,
            newlyAdded,
            bonuses,
            rooms,
            collectedAt,
            debug,
          }: RawHotelDocument): RawHotel {
    return new RawHotel(
      hotelId,
      name,
      price,
      tax,
      distanceFromCenter,
      distanceFromCenterOrderIndex,
      districtName,
      coords,
      hotelLink,
      rate,
      secondaryRateType,
      secondaryRate,
      numberOfReviews,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
      debug,
    )
  }
}
