import { Hotel } from '../../core/model/Hotel';
import { HotelDocument } from './document/hotel.document';

export class HotelDocumentMapper {
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
