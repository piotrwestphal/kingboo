import { Bonuses } from '../core/interface/bonuses';
import { RawRoomDto } from '@kb/model';
import { Coords } from '@kb/model';
import { Room } from '../core/interface/room';

export class RawHotelDtoParser {

  public parseRate(rate: string): number | null {
    if (!rate) {
      return null;
    }
    const trimmedRate = rate.trim();
    if (trimmedRate === '10') { // It is only one case when there is no dot
      return 100;
    }
    const rateWithoutDots = trimmedRate.replace(/\./g, '');
    return parseInt(rateWithoutDots, 0) || null;
  }

  public parseNumberOfReviews = (numberOfReviews: string): number | null => parseInt(this.removeComma(numberOfReviews), 0) || null;

  // "Eixample,Barcelona – Show on map"
  // "Upper West Side,New York City – Show on map"
  // "Śródmieście,Gdynia – Show on map"
  public parseDistrictName(districtName: string): string | null {
    if (!districtName) {
      return null;
    }
    const districtNameWithCity = districtName.replace(/ –([^–]+)$/g, '').trim();
    const splitArr = districtNameWithCity.split(',');
    splitArr.pop();
    return (splitArr?.length > 0)
      ? splitArr.reduce((v1, v2) => v1 + v2)
      : null;
  }

  // ORDER: lon, lat
  // "19.937436,50.059889"
  // "121.707012653278,31.1850818301733"
  public parseCoords(coords: string): Coords | null {
    if (!coords) {
      return null;
    }
    const split = coords.split(',');
    return {
      lat: Number(split[1]),
      lon: Number(split[0]),
    };
  }

  public parseBonuses(bonuses: string[]): Bonuses | null {
    return bonuses?.length
      ? this.mapBonuses(bonuses)
      : null;
  }

  public parseRooms(rooms: RawRoomDto[]): Room[] | null {
    return rooms?.length
      ? rooms.map(bonus => this.formatRoom(bonus))
      : null;
  }

  private mapBonuses(rawBonuses: string[]): Bonuses {
    const lowerCaseRawBonuses = rawBonuses.map(v => v.toLocaleLowerCase());
    const bonuses = {
      freeCancellation: lowerCaseRawBonuses.some((v) => v.includes('free cancellation')),
      cancelLater: lowerCaseRawBonuses.some((v) => v.includes('risk free')),
      noPrepayment: lowerCaseRawBonuses.some((v) => v.includes('no prepayment')),
      breakfastIncluded: lowerCaseRawBonuses.some((v) => v.includes('breakfast included')),
    };
    return this.isEmptyObject(bonuses)
      ? null
      : bonuses;
  }

  private formatRoom({
                       shortDescription,
                       longDescription,
                       personCount,
                       beds,
                       bonuses,
                     }: RawRoomDto): Room {
    return {
      shortDescription,
      longDescription,
      personCount,
      beds,
      bonuses: this.mapBonuses(bonuses),
    };
  }

  private isEmptyObject = (obj: any) => Object.keys(obj).length === 0;

  private removeComma = (value: string) => value ? value.replace(/,/g, '') : null;
}
