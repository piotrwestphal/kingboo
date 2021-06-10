import { ScrapedRawHotel } from '../../scrap/interface/scraped-raw-hotel'
import { RawHotel } from '../../core/model/RawHotel'
import { RawHotelDto } from '@kb/model'

export class RawHotelMapper {

  static fromScrapedRawHotel({
                               name,
                               price,
                               tax,
                               distanceFromCenter,
                               districtName,
                               coords,
                               hotelLink,
                               room,
                               rate,
                               secondaryRate,
                               secondaryRateType,
                               numberOfReviews,
                               starRating,
                               newlyAdded,
                               bonuses,
                               rooms,
                               debug,
                             }: ScrapedRawHotel,
                             orderIndex: number,
                             collectedAt: string): RawHotel {
    const hotelId = this.assignHotelId(name, coords)
    return new RawHotel(
      hotelId,
      name,
      price,
      tax,
      distanceFromCenter,
      orderIndex,
      districtName,
      coords,
      hotelLink,
      room,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
      debug,
    )
  }

  static toDto({
                 hotelId,
                 name,
                 price,
                 tax,
                 distanceFromCenter,
                 distanceFromCenterOrderIndex,
                 districtName,
                 coords,
                 hotelLink,
                 room,
                 rate,
                 secondaryRate,
                 secondaryRateType,
                 numberOfReviews,
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
      distanceFromCenterOrderIndex,
      districtName,
      coords,
      hotelLink,
      room,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      starRating,
      newlyAdded,
      bonuses,
      rooms,
      collectedAt,
    }
  }

  private static assignHotelId = (name: string, coords: string) => {
    return Buffer.from(`${name}${coords ? coords : ''}`)
      .toString('base64')
  }
}
