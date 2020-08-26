import { Coords } from '@kb/model/coords';
import { LatestValues } from '../interface/latest-values';
import { CalculatedValues } from '../interface/calculated-values';
import { PriceChange } from '@kb/model/price-change';
import { HotelIdentifier } from '../interface/hotel-identifier';

export class Hotel implements HotelIdentifier {
  constructor(
    readonly searchId: string,
    readonly hotelId: string,
    readonly name: string,
    readonly distanceFromCenterMeters: number,
    readonly districtName: string,
    readonly coords: Coords,
    readonly hotelLink: string,
    readonly propertyType: string,
    readonly starRating: number,
    readonly collectedAt: string[],
    readonly priceChanges: PriceChange[],
    public latestValues: LatestValues,
    public calculatedValues: CalculatedValues,
  ) {
  }

  updateWithChangedPrice(price: number,
                         collectedAt: string,
                         latestValues: LatestValues,
                         calculatedValues: CalculatedValues): Hotel {
    this.priceChanges.push({ value: price, occurrenceCount: 1, changedAt: collectedAt });
    return this.update(collectedAt, latestValues, calculatedValues);
  }

  updateWhenPriceHasNotChanged(collectedAt: string,
                               latestValues: LatestValues,
                               calculatedValues: CalculatedValues): Hotel {
    const lastPriceChange = this.priceChanges.pop()
    this.priceChanges.push({ ...lastPriceChange, occurrenceCount: lastPriceChange.occurrenceCount + 1 });
    return this.update(collectedAt, latestValues, calculatedValues);
  }

  private update(collectedAt: string,
                 latestValues: LatestValues,
                 calculatedValues: CalculatedValues): Hotel {
    this.collectedAt.push(collectedAt);
    this.latestValues = latestValues;
    this.calculatedValues = calculatedValues;
    return this;
  }
}
