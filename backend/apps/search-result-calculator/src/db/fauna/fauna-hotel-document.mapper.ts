import { Hotel } from '../../core/model/hotel';
import { HotelDocument } from './interface/hotel.document';

export class FaunaHotelDocumentMapper {

  fromHotel({
              searchId,
              hotelId,
              name,
              distanceFromCenterMeters,
              districtName,
              coords,
              hotelLink,
              propertyType,
              starRating,
              prices,
              latestValues,
              calculatedValues,
              collectedAt,
            }: Hotel): HotelDocument {
    return {
      searchId,
      hotelId,
      name,
      distanceFromCenterMeters,
      districtName,
      coords,
      hotelLink,
      propertyType,
      starRating,
      prices,
      latestValues,
      calculatedValues,
      collectedAt,
    };
  }

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
            prices,
            latestValues,
            calculatedValues,
            collectedAt,
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
      prices,
      latestValues,
      calculatedValues,
      collectedAt,
    );
  }
}
