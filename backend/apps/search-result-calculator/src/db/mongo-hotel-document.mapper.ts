import { Hotel } from '../core/model/hotel';
import { HotelDocument } from './interface/hotel.document';

export class MongoHotelDocumentMapper {
  toHotel({
            searchId,
            hotelId,
            name,
            distanceFromCenterMeters,
            districtName,
            coords,
            hotelLink,
            propertyType,
            starRating,
            priceChanges,
            collectedAt,
            latestValues,
            calculatedValues,
            lastCollectedAt,
          }: HotelDocument): Hotel {
    return new Hotel(
      searchId,
      hotelId,
      name,
      distanceFromCenterMeters,
      districtName,
      coords,
      hotelLink,
      propertyType,
      starRating,
      (priceChanges ?? []),
      collectedAt,
      latestValues,
      calculatedValues,
      lastCollectedAt,
    );
  }
}
