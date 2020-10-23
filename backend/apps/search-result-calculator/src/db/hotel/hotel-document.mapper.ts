import { Hotel } from '../../core/model/Hotel';
import { HotelDocument } from './document/hotel.document';
import { SaveHotel } from './save-hotel';

export class HotelDocumentMapper {

  prepareForSave({
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
                 }: Hotel): SaveHotel {
    return {
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
    }
  }

  fromDoc({
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
