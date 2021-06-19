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
                       roomName,
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
    const calculatedValues = this.calculateIfPriceAvailable(currentPrice, hotel)
    const [lastPriceChange] = hotel.priceChanges.slice(-1)
    const latestValues: LatestValues = {
      price: currentPrice,
      roomName,
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
    return lastPriceChange && lastPriceChange.price === currentPrice && lastPriceChange.room === roomName
      ? hotel.updateWithNotChangedValues(collectedAt, latestValues, calculatedValues)
      : hotel.updateWithChangedValues(currentPrice, collectedAt, latestValues, calculatedValues)
  }

  private calculateIfPriceAvailable(currentPrice: number, hotel: Hotel) {
    if (currentPrice) {
      const availablePriceChanges = hotel.priceChanges.filter(v => !!v.price)
      return this.priceCalculator.calculate(currentPrice, availablePriceChanges)
    }
    return hotel.calculatedValues
  }
}
