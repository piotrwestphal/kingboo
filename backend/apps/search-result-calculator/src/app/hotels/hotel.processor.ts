import { MessageProcessor } from '../../processing/message.processor';
import { HotelRepository } from '../../core/abstract/hotel.repository';
import { RawHotelDto } from '@kb/model';
import { FileManager } from '@kb/util/file.manager';
import { HotelFactory } from './hotel.factory';
import { PriceCalculator } from './price.calculator';
import { Hotel } from '../../core/model/Hotel';
import { RawHotel } from '../../core/interface/raw-hotel';
import { AppConfigService } from '../../config/app-config.service';
import { logger } from '../../logger';
import { LatestValues } from '../../core/interface/latest-values';
import { ProgressMeasuringService } from '../processing-progress/progress-measuring.service';

export class HotelProcessor {

  constructor(
    private readonly configService: AppConfigService,
    private readonly fileManager: FileManager,
    private readonly hotelFactory: HotelFactory,
    private readonly hotelRepository: HotelRepository,
    private readonly messageProcessor: MessageProcessor,
    private readonly priceCalculator: PriceCalculator,
    private readonly progressMeasuringService: ProgressMeasuringService,
  ) {
  }

  async processMessage(searchId: string, rawHotels: RawHotelDto[], debugMarker: number): Promise<void> {
    const rawHotelsById = this.messageProcessor.processMessage(searchId, rawHotels);
    logger.debug(`[${debugMarker}] Process message last [${Date.now() - debugMarker}] ms`);
    const rawHotelIds = Array.from(rawHotelsById.keys());
    if (this.configService.saveResultAsJson) {
      const now1 = Date.now()
      const pathToResult = await this.fileManager.saveDataAsJSON(Array.from(rawHotelsById.values()), `PROCESSED-${searchId}`);
      logger.debug(`Processed data was saved locally to [${pathToResult}]`);
      logger.debug(`[${debugMarker}] Saving json last [${Date.now() - now1}] ms`);
    }
    logger.debug(`Processed message with hotel ids`, rawHotelIds);
    const now2 = Date.now()
    const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(searchId, Array.from(rawHotelsById.keys()));
    logger.debug(`[${debugMarker}] Searching hotels last [${Date.now() - now2}] ms`);

    const hotelsToCreate = rawHotelIds
      .filter(hotelId => !foundHotels.has(hotelId))
      .map(hotelId => rawHotelsById.get(hotelId));

    if (hotelsToCreate.length) {
      const now3 = Date.now()
      const created = await this.hotelRepository.createAll(hotelsToCreate.map(h => this.hotelFactory.createNew(h)));
      logger.debug(`Hotels were created for search id ${searchId}, hotel ids`, created.map(h => h.hotelId));
      logger.debug(`[${debugMarker}] Creating hotels in db last [${Date.now() - now3}] ms`);
    }
    const now4 = Date.now()
    const updatedHotelsWithRaw = Array.from(foundHotels.keys()).map(hotelId => {
      const hotel = foundHotels.get(hotelId);
      const rawHotel = rawHotelsById.get(hotelId);
      return this.updateHotelWithRaw(hotel, rawHotel);
    });
    logger.debug(`[${debugMarker}] Updating hotels with raw last [${Date.now() - now4}] ms`);

    if (updatedHotelsWithRaw.length) {
      const now5 = Date.now()
      const updated = await this.hotelRepository.updateAll(updatedHotelsWithRaw);
      logger.debug(`Hotels were updated for search id ${searchId}, hotel ids`, updated.map(h => h.hotelId));
      logger.debug(`[${debugMarker}] Updating hotels in db last [${Date.now() - now5}] ms`);
    }
    this.progressMeasuringService.setProgress(searchId);
  }

  // TODO: move more properties to latestValues
  private updateHotelWithRaw(hotel: Hotel,
                             {
                               price: currentPrice,
                               districtName,
                               distanceFromCenterMeters,
                               hotelLink,
                               rate,
                               secondaryRate,
                               secondaryRateType,
                               numberOfReviews,
                               newlyAdded,
                               starRating,
                               bonuses,
                               rooms,
                               collectedAt,
                             }: RawHotel): Hotel {
    const calculatedValues = this.priceCalculator.calculate(currentPrice, hotel.priceChanges);
    const [lastPrice] = hotel.priceChanges.slice(-1);
    const latestValues: LatestValues = {
      price: currentPrice,
      districtName,
      distanceFromCenterMeters,
      hotelLink,
      rate,
      secondaryRate,
      secondaryRateType,
      numberOfReviews,
      newlyAdded,
      starRating,
      bonuses,
      rooms,
    }
    return lastPrice && lastPrice.value === currentPrice
      ? hotel.updateWhenPriceHasNotChanged(collectedAt, latestValues, calculatedValues)
      : hotel.updateWithChangedPrice(currentPrice, collectedAt, latestValues, calculatedValues);
  }
}
