import { Coords } from '@kb/model/coords'
import { LatestValues } from '../interface/latest-values'
import { CalculatedValues } from '../interface/calculated-values'
import { HotelIdentifier } from '../interface/hotel-identifier'
import { PriceChange } from '@kb/model'

export class Hotel implements HotelIdentifier {
  constructor(
    readonly searchId: string,
    readonly hotelId: string,
    readonly name: string,
    readonly coords: Coords,
    readonly priceChanges: PriceChange[],
    readonly collectedAt: string[],
    public latestValues: LatestValues,
    public calculatedValues: CalculatedValues,
    public lastCollectedAt: string,
    public collectingCount: number,
  ) {
  }

  updateWithChangedValues(price: number,
                          collectedAt: string,
                          latestValues: LatestValues,
                          calculatedValues: CalculatedValues): Hotel {
    this.priceChanges.push({ price, room: latestValues.roomName, occurrenceCount: 1, changedAt: collectedAt })
    return this.update(collectedAt, latestValues, calculatedValues)
  }

  updateWithNotChangedValues(collectedAt: string,
                             latestValues: LatestValues,
                             calculatedValues: CalculatedValues): Hotel {
    const { price, room, changedAt, occurrenceCount } = this.priceChanges.pop()
    this.priceChanges.push({ price, room, changedAt, occurrenceCount: occurrenceCount + 1 })
    return this.update(collectedAt, latestValues, calculatedValues)
  }

  private update(collectedAt: string,
                 latestValues: LatestValues,
                 calculatedValues: CalculatedValues): Hotel {
    this.collectedAt.push(collectedAt)
    this.latestValues = latestValues
    this.calculatedValues = calculatedValues
    this.lastCollectedAt = collectedAt
    this.collectingCount = this.collectedAt.length
    return this
  }
}
