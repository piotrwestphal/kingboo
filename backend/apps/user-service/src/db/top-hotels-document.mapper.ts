import { TopHotelsDocument } from './top-hotels.document'
import { IndexedTopHotels, SimpleHotelDto } from '@kb/model'
import { SimpleHotelDocument } from './simple-hotel.document'

export class TopHotelsDocumentMapper {
  fromDoc({
            orderIndex,
            bestPriceRate,
            cheapest,
            bestRate,
            bestLocation,
          }: TopHotelsDocument): IndexedTopHotels {
    return {
      orderIndex,
      bestPriceRate: this.fixDates(bestPriceRate),
      cheapest: this.fixDates(cheapest),
      bestRate: this.fixDates(bestRate),
      bestLocation: this.fixDates(bestLocation),
    }
  }

  private fixDates({
                     lastCollectedAt,
                     priceChanges,
                     ...restOfHotelDoc
                   }: SimpleHotelDocument): SimpleHotelDto {
    return {
      ...restOfHotelDoc,
      lastCollectedAt: lastCollectedAt.toDate().toISOString(),
      priceChanges: priceChanges.map(({
                                        changedAt,
                                        ...restOfPriceChange
                                      }) => ({
        ...restOfPriceChange,
        changedAt: changedAt.toDate().toISOString(),
      }))
    }
  }
}
