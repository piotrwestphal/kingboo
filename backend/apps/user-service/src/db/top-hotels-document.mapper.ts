import { TopHotelsDocument } from './top-hotels.document'
import { SimpleHotelDto, TopHotelsDto } from '@kb/model'
import { SimpleHotelDocument } from './simple-hotel.document'

export class TopHotelsDocumentMapper {
  fromDoc({
            bestPriceRate,
            cheapest,
            bestRate,
            bestLocation,
          }: TopHotelsDocument): TopHotelsDto {
    return {
      bestPriceRate: this.fixDates(bestPriceRate),
      cheapest: this.fixDates(cheapest),
      bestRate: this.fixDates(bestRate),
      bestLocation: this.fixDates(bestLocation),
    }
  }

  private fixDates(hotels: SimpleHotelDocument[]): SimpleHotelDto[] {
    return hotels.map(({
                         lastCollectedAt,
                         priceChanges,
                         ...restOfHotelDoc
                       }: SimpleHotelDocument) => ({
      ...restOfHotelDoc,
      lastCollectedAt: lastCollectedAt.toDate().toISOString(),
      priceChanges: priceChanges.map(({
                                        changedAt,
                                        ...restOfPriceChange
                                      }) => ({
        ...restOfPriceChange,
        changedAt: changedAt.toDate().toISOString(),
      }))
    }))
  }
}
