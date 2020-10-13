import { Hotel } from '../core/model/hotel';
import { HotelDocument } from './interface/hotel.document';

export class MongoHotelDocumentMapper {
  toHotel({
            searchId,
            hotelId,
            name,
            coords,
            priceChanges,
            collectedAt,
            latestValues,
            calculatedValues,
            lastCollectedAt,
            collectingCount,
          }: HotelDocument): Hotel {
    return new Hotel(
      searchId,
      hotelId,
      name,
      coords,
      (priceChanges ?? []),
      collectedAt,
      latestValues,
      calculatedValues,
      lastCollectedAt,
      collectingCount,
    );
  }
}
