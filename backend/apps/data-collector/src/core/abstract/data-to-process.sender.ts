import { RawHotel } from '../model/RawHotel';

export abstract class DataToProcessSender {
  abstract sendHotels(searchId: string,
                      rawHotels: RawHotel[],
                      collectedAt: string): void;
}
