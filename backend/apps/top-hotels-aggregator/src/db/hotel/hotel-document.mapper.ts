import { SimpleHotelDocument } from './simple-hotel.document'
import { SimpleHotelDto } from '@kb/model'

export class HotelDocumentMapper {

  fromDoc({
            searchId,
            hotelId,
            name,
            coords,
            priceChanges,
            latestValues,
            calculatedValues,
            lastCollectedAt,
            collectingCount,
          }: SimpleHotelDocument): SimpleHotelDto {
    return {
      searchId,
      hotelId,
      name,
      coords,
      priceChanges: (priceChanges ?? []),
      latestValues,
      calculatedValues,
      lastCollectedAt,
      collectingCount,
    }
  }
}
