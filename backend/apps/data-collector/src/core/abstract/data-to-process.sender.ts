import { RawHotel } from '../model/RawHotel';

export abstract class DataToProcessSender {
  abstract sendHotelsPart(searchId: string,
                          rawHotels: RawHotel[]): void;

  abstract sendHotelsSummary(searchId: string,
                             expectedNumberOfParts: number): void;
}
