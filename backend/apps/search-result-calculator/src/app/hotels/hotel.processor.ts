import { MessageProcessor } from '../../processing/message.processor'
import { HotelRepository } from '../../core/abstract/hotel.repository'
import { RawHotelDto } from '@kb/model'
import { FileManager } from '@kb/util/file.manager'
import { HotelFactory } from './hotel.factory'
import { PriceCalculator } from './price.calculator'
import { Hotel } from '../../core/model/Hotel'
import { RawHotel } from '../../core/interface/raw-hotel'
import { AppConfigService } from '../../config/app-config.service'
import { logger } from '../../logger'
import { LatestValues } from '../../core/interface/latest-values'
import { ProgressMeasuringService } from '../processing-progress/progress-measuring.service'

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

  async processMessage(searchId: string, rawHotels: RawHotelDto[]): Promise<void> {
    const rawHotelsById = this.messageProcessor.processMessage(searchId, rawHotels)
    const rawHotelIds = Array.from(rawHotelsById.keys())
    if (this.configService.saveResultAsJson) {
      const pathToResult = await this.fileManager.saveDataAsJSON(Array.from(rawHotelsById.values()), `PROCESSED-${searchId}`)
      logger.debug(`Processed data was saved locally to [${pathToResult}]`)
    }
    logger.debug(`Processed message with hotel ids`, rawHotelIds)
    const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(searchId, Array.from(rawHotelsById.keys()))

    const hotelsToCreate = rawHotelIds
      .filter(hotelId => !foundHotels.has(hotelId))
      .map(hotelId => rawHotelsById.get(hotelId))

    if (hotelsToCreate.length) {
      const created = await this.hotelRepository.createAll(hotelsToCreate.map(h => this.hotelFactory.createNew(h)))
      logger.debug(`Hotels were created for search id ${searchId}, hotel ids`, created.map(h => h.hotelId))
    }
    const updatedHotelsWithRaw = Array.from(foundHotels.keys()).map(hotelId => {
      const hotel = foundHotels.get(hotelId)
      const rawHotel = rawHotelsById.get(hotelId)
      return this.updateHotelWithRaw(hotel, rawHotel)
    })

    if (updatedHotelsWithRaw.length) {
      await this.hotelRepository.updateAll(updatedHotelsWithRaw)
      logger.debug(`Hotels were updated for search id ${searchId}, hotel ids`, updatedHotelsWithRaw.map(h => h.hotelId))
    }
    this.progressMeasuringService.setProgress(searchId)
  }

  private updateHotelWithRaw(hotel: Hotel,
                             {
                               price: currentPrice,
                               districtName,
                               distanceFromCenterMeters,
                               distanceFromCenterOrderIndex,
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
    const calculatedValues = this.priceCalculator.calculate(currentPrice, hotel.priceChanges)
    const [lastPrice] = hotel.priceChanges.slice(-1)
    const latestValues: LatestValues = {
      price: currentPrice,
      districtName,
      distanceFromCenterMeters,
      distanceFromCenterOrderIndex,
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
      : hotel.updateWithChangedPrice(currentPrice, collectedAt, latestValues, calculatedValues)
  }
}
