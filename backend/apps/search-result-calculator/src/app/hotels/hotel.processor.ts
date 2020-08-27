import { MessageProcessor } from '../../processing/message.processor';
import { HotelRepository } from '../../core/abstract/hotel.repository';
import { CollectedHotelsMessage } from '@kb/model';
import { FileManager } from '@kb/util/file.manager';
import { HotelFactory } from './hotel.factory';
import { PriceCalculator } from './price.calculator';
import { Hotel } from '../../core/model/hotel';
import { RawHotel } from '../../core/interface/raw-hotel';
import { AppConfigService } from '../../config/app-config.service';
import { logger } from '../../logger';
import { UserNotificationSender } from '../../core/abstract/user-notification.sender';
import { LatestValues } from '../../core/interface/latest-values';

export class HotelProcessor {

  constructor(
    private readonly configService: AppConfigService,
    private readonly fileManager: FileManager,
    private readonly hotelFactory: HotelFactory,
    private readonly hotelRepository: HotelRepository,
    private readonly messageProcessor: MessageProcessor,
    private readonly priceCalculator: PriceCalculator,
    private readonly userNotificationSender: UserNotificationSender,
  ) {
  }

  async processMessage(message: CollectedHotelsMessage): Promise<void> {
    const now = Date.now();
    const rawHotels = this.messageProcessor.processMessage(message);
    const rawHotelIds = Array.from(rawHotels.keys());
    if (this.configService.saveResultAsJson) {
      const pathToResult = await this.fileManager.saveDataAsJSON(Array.from(rawHotels.values()), `PROCESSED-${message.searchId}`);
      logger.debug(`Processed data was saved locally to [${pathToResult}]`);
    }
    logger.debug(`Processed message with hotel ids`, rawHotelIds);
    const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(message.searchId, Array.from(rawHotels.keys()));

    const hotelsToCreate = rawHotelIds
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
    const messageProcessingTimeMs = Date.now() - now;
    this.userNotificationSender.notifyAboutHotelsProcessingFinished(
      message.searchId, rawHotelIds, messageProcessingTimeMs);
    logger.debug(`Message processing last [${messageProcessingTimeMs}] ms`);
  }

  private updateHotelWithRaw(hotel: Hotel,
                             {
                               price: currentPrice,
                               rate,
                               secondaryRate,
                               secondaryRateType,
                               numberOfReviews,
                               newlyAdded,
                               bonuses,
                               rooms,
                               collectedAt,
                             }: RawHotel): Hotel {
    const calculatedValues = this.priceCalculator.calculate(currentPrice, hotel.priceChanges);
    const [lastPrice] = hotel.priceChanges.slice(-1);
    const latestValues: LatestValues = {
      price: currentPrice,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      newlyAdded,
      bonuses,
      rooms,
    }
    return lastPrice && lastPrice.value === currentPrice
      ? hotel.updateWhenPriceHasNotChanged(collectedAt, latestValues, calculatedValues)
      : hotel.updateWithChangedPrice(currentPrice, collectedAt, latestValues, calculatedValues);
  }
}
