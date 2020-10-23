import { DistanceParser } from './parser/distance.parser';
import { PriceParser } from './parser/price.parser';
import { RawHotelDtoParser } from './raw-hotel-dto.parser';
import { RawHotel } from '../core/interface/raw-hotel';
import { RawHotelDto } from '@kb/model';

export class MessageProcessor {

  constructor(
    private readonly distanceParser: DistanceParser,
    private readonly priceParser: PriceParser,
    private readonly rawSearchResultParser: RawHotelDtoParser,
  ) {
  }

  processMessage(searchId: string, rawHotelsDto: RawHotelDto[]): Map<string, RawHotel> {
    return rawHotelsDto.reduce((map: Map<string, RawHotel>, dto) => {
      const rawHotel = this.fromDto(searchId, dto);
      return map.set(rawHotel.hotelId, rawHotel);
    }, new Map<string, RawHotel>());
  }

  private fromDto(searchId: string, {
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
    starRating,
    newlyAdded,
    bonuses,
    rooms,
    collectedAt,
  }: RawHotelDto): RawHotel {
    return {
      searchId,
      hotelId,
      name: name.trim(),
      price: this.priceParser.parse(price, tax),
      distanceFromCenterMeters: this.distanceParser.parseDistance(distanceFromCenter),
      districtName: this.rawSearchResultParser.parseDistrictName(districtName),
      coords: this.rawSearchResultParser.parseCoords(coords),
      hotelLink,
      rate: this.rawSearchResultParser.parseRate(rate),
      secondaryRate: this.rawSearchResultParser.parseRate(secondaryRate),
      secondaryRateType: secondaryRateType ? secondaryRateType.trim() : null,
      numberOfReviews: this.rawSearchResultParser.parseNumberOfReviews(numberOfReviews),
      starRating,
      newlyAdded: !!newlyAdded,
      bonuses: this.rawSearchResultParser.parseBonuses(bonuses),
      rooms: this.rawSearchResultParser.parseRooms(rooms),
      collectedAt,
    };
  }
}
