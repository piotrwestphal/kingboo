import { DistanceParser } from './parser/distance.parser';
import { PriceParser } from './parser/price.parser';
import { RawHotelDtoParser } from './raw-hotel-dto.parser';
import { RawHotel } from '../core/interface/raw-hotel';
import { RawHotelDto } from '@kb/model';

export class MessageProcessor {

  constructor(
    private readonly distanceParser: DistanceParser,
    private readonly priceParser: PriceParser,
    private readonly rawHotelDtoParser: RawHotelDtoParser,
  ) {
  }

  process(searchId: string, {
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
  }: RawHotelDto): RawHotel {
    return {
      searchId,
      hotelId,
      name: name.trim(),
      price: this.priceParser.parse(price, tax),
      distanceFromCenterMeters: this.distanceParser.parseDistance(distanceFromCenter),
      distanceFromCenterOrderIndex,
      districtName: this.rawHotelDtoParser.parseDistrictName(districtName),
      coords: this.rawHotelDtoParser.parseCoords(coords),
      hotelLink,
      room: room ? room.trim() : null,
      rate: this.rawHotelDtoParser.parseRate(rate),
      secondaryRate: this.rawHotelDtoParser.parseRate(secondaryRate),
      secondaryRateType: secondaryRateType ? secondaryRateType.trim() : null,
      numberOfReviews: this.rawHotelDtoParser.parseNumberOfReviews(numberOfReviews),
      starRating,
      newlyAdded: !!newlyAdded,
      bonuses: this.rawHotelDtoParser.parseBonuses(bonuses),
      rooms: this.rawHotelDtoParser.parseRooms(rooms),
      collectedAt,
    };
  }
}
