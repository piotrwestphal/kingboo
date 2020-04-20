import { ScrapedRawHotel } from '../../scrap/interface/scraped-raw-hotel';
import { RawHotel } from '../../core/model/RawHotel';
import { RawHotelDto } from '@kb/model/raw-hotel.dto';

export class RawHotelMapper {
  static fromScrapedRawHotel({
                               name,
                               price,
                               tax,
                               distanceFromCenter,
                               districtName,
                               coords,
                               hotelLink,
                               rate,
                               secondaryRate,
                               secondaryRateType,
                               numberOfReviews,
                               propertyType,
                               starRating,
                               newlyAdded,
                               bonuses,
                               rooms,
                               debug
                             }: ScrapedRawHotel,
                             collectedAt: string): RawHotel {
    return new RawHotel(
      name,
      price,
      tax,
      distanceFromCenter,
      districtName,
      coords,
      hotelLink,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      propertyType,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
      debug,
    );
  }

  static toDto({
                 hotelId,
                 name,
                 price,
                 tax,
                 distanceFromCenter,
                 districtName,
                 coords,
                 hotelLink,
                 rate,
                 secondaryRate,
                 secondaryRateType,
                 numberOfReviews,
                 propertyType,
                 starRating,
                 newlyAdded,
                 bonuses,
                 rooms,
                 collectedAt,
               }: RawHotel): RawHotelDto {
    return {
      hotelId,
      name,
      price,
      tax,
      distanceFromCenter,
      districtName,
      coords,
      hotelLink,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      propertyType,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
    };
  }
}
