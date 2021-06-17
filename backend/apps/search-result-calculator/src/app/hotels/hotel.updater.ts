import { Hotel } from '../../core/model/Hotel'
import { RawHotel } from '../../core/interface/raw-hotel'
import { LatestValues } from '../../core/interface/latest-values'
import { PriceCalculator } from './price.calculator'

export class HotelUpdater {

  constructor(
    private readonly priceCalculator: PriceCalculator,
  ) {
  }

  updateHotelWithRaw(hotel: Hotel,
                     {
                       price: currentPrice,
                       districtName,
                       distanceFromCenterMeters,
                       distanceFromCenterOrderIndex,
                       hotelLink,
                       room,
                       rate,
                       secondaryRate,
                       secondaryRateType,
                       numberOfReviews,
                       newlyAdded,
                       starRating,
                       bonuses,
                       rooms,
                       collectedAt,
                     }: RawHotel): Hotel {
    const calculatedValues = this.priceCalculator.calculate(currentPrice, hotel.priceChanges)
    const [lastPrice] = hotel.priceChanges.slice(-1)
    const latestValues: LatestValues = {
      price: currentPrice,
      districtName,
      distanceFromCenterMeters,
      distanceFromCenterOrderIndex,
      hotelLink,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      newlyAdded,
      starRating,
      bonuses,
      rooms,
    }
    return lastPrice && lastPrice.value === currentPrice
      ? hotel.updateWhenPriceHasNotChanged(collectedAt, latestValues, calculatedValues)
      : hotel.updateWithChangedPrice(currentPrice, collectedAt, latestValues, calculatedValues)
  }
}
