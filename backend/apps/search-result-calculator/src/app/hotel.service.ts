import { MessageProcessor } from '../processing/message.processor';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { CollectedHotelsMessage } from '@kb/model';
import { FileManager } from '@kb/util/file.manager';
import { HotelFactory } from './hotel.factory';
import { PriceCalculator } from './price.calculator';
import { Hotel } from '../core/model/hotel';
import { RawHotel } from '../core/interface/raw-hotel';
import { AppConfigService } from '../config/app-config.service';
import { logger } from '../logger';

export class HotelService {

  constructor(
    private readonly configService: AppConfigService,
    private readonly fileManager: FileManager,
    private readonly hotelFactory: HotelFactory,
    private readonly hotelRepository: HotelRepository,
    private readonly messageProcessor: MessageProcessor,
    private readonly priceCalculator: PriceCalculator,
  ) {
  }

  async processMessage(message: CollectedHotelsMessage): Promise<void> {
    const now = Date.now();
    const rawHotels = this.messageProcessor.processMessage(message);
    if (this.configService.saveResultInJson) {
      await this.fileManager.saveDataAsJSON(Array.from(rawHotels.values()), `PROCESSED_DATA_${message.searchId}`);
    }
    logger.debug(`Processed message with hotel ids`, Array.from(rawHotels.keys()));
    const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(message.searchId, Array.from(rawHotels.keys()));

    const hotelsToCreate = Array.from(rawHotels.keys())
      .filter(hotelId => !foundHotels.has(hotelId))
      .map(hotelId => rawHotels.get(hotelId));

    if (hotelsToCreate.length) {
      const created = await this.hotelRepository.createAll(hotelsToCreate.map(h => this.hotelFactory.createNew(h)));
      logger.debug(`Hotels were created for hotel ids`, created.map(h => h.hotelId));
    }
    const updatedHotelsWithRaw = Array.from(foundHotels.keys()).map(hotelId => {
      const hotel = foundHotels.get(hotelId);
      const rawHotel = rawHotels.get(hotelId);
      return this.updateHotelWithRaw(hotel, rawHotel);
    });

    if (updatedHotelsWithRaw.length) {
      const updated = await this.hotelRepository.updateAll(updatedHotelsWithRaw);
      logger.debug(`Hotels were updated for hotel ids`, updated.map(h => h.hotelId));
    }
    console.debug(`Message processing last [${Date.now() - now}] ms`);
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
