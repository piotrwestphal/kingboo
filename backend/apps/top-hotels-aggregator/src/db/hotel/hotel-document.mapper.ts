import { SimpleHotel } from '../../core/interface/simple-hotel'
import { SimpleHotelDocument } from './simple-hotel.document'

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
          }: SimpleHotelDocument): SimpleHotel {
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
