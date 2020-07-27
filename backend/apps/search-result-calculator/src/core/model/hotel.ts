import { Coords } from '../interface/coords';
import { LatestValues } from '../interface/latest-values';
import { CalculatedValues } from '../interface/calculated-values';
import { ValueWithDate } from '@kb/model/value-with-date';
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
    readonly prices: ValueWithDate<number>[],
    public latestValues: LatestValues,
    public calculatedValues: CalculatedValues,
    readonly collectedAt: string[],
  ) {
  }

  update(price: number,
         collectedAt: string,
         latestValues: LatestValues,
         calculatedValues: CalculatedValues): Hotel {
    this.prices.push({value: price, date: collectedAt})
    this.collectedAt.push(collectedAt);
    this.latestValues = latestValues;
    this.calculatedValues = calculatedValues;
    return this;
  }
}
