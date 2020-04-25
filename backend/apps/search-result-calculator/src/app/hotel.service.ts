import { MessageProcessor } from '../processing/message.processor';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { CollectedHotelsMessage } from '@kb/model';
import { FileManager } from '@kb/util/file.manager';
import { HotelFactory } from './hotel.factory';
import { PriceCalculator } from './price.calculator';
import { Hotel } from '../core/model/hotel';
import { RawHotel } from '../core/interface/raw-hotel';

export class HotelService {

  constructor(
    private readonly fileManager: FileManager,
    private readonly hotelFactory: HotelFactory,
    private readonly hotelRepository: HotelRepository,
    private readonly messageProcessor: MessageProcessor,
    private readonly priceCalculator: PriceCalculator,
  ) {
  }

  // TODO: add prefetch count of something because too many messages can income
  async processMessage(message: CollectedHotelsMessage): Promise<void> {
    const now = Date.now();
    const rawHotels = this.messageProcessor.processMessage(message);
    await this.fileManager.saveDataAsJSON(rawHotels, `PROCESSED_MESSAGE_${message.searchId}`);
    const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(message.searchId, Array.from(rawHotels.keys()));

    const hotelsToCreate = Array.from(rawHotels.keys())
      .filter(hotelId => !foundHotels.has(hotelId))
      .map(hotelId => rawHotels.get(hotelId));

    if (hotelsToCreate.length) {
      await this.hotelRepository.createAll(hotelsToCreate.map(h => this.hotelFactory.createNew(h)));
    }
    const updatedHotelsWithRaw = Array.from(foundHotels.keys()).map(hotelId => {
      const hotel = foundHotels.get(hotelId);
      const rawHotel = rawHotels.get(hotelId);
      return this.updateHotelWithRaw(hotel, rawHotel);
    });
    console.log('UPDATED HOTELS: ', updatedHotelsWithRaw.length);

    await this.hotelRepository.updateAll(updatedHotelsWithRaw);
    console.log(`PROCESSING_LAST: [${Date.now() - now}] ms`);
  }

  private updateHotelWithRaw(hotel: Hotel,
                             {
                               price,
                               rate,
                               secondaryRate,
                               secondaryRateType,
                               numberOfReviews,
                               newlyAdded,
                               bonuses,
                               rooms,
                               collectedAt,
                             }: RawHotel): Hotel {
    const calculatedValues = this.priceCalculator.calculate(price, hotel.prices);
    return hotel.update(
      price,
      collectedAt,
      {
        price,
        rate,
        secondaryRate,
        secondaryRateType,
        numberOfReviews,
        newlyAdded,
        bonuses,
        rooms,
      },
      calculatedValues,
    );
  }
}
