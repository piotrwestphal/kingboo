import { MessageProcessor } from '../../processing/message.processor'
import { HotelRepository } from '../../core/abstract/hotel.repository'
import { RawHotelDto } from '@kb/model'
import { HotelFactory } from './hotel.factory'
import { PriceCalculator } from './price.calculator'
import { Hotel } from '../../core/model/Hotel'
import { RawHotel } from '../../core/interface/raw-hotel'
import { AppConfigService } from '../../config/app-config.service'
import { logger } from '../../logger'
import { LatestValues } from '../../core/interface/latest-values'
import { ProgressMeasuringService } from '../processing-progress/progress-measuring.service'
import { FileRepository } from '@kb/storage'

export class HotelProcessor {

  constructor(
    private readonly configService: AppConfigService,
    private readonly fileRepository: FileRepository,
    private readonly hotelFactory: HotelFactory,
    private readonly hotelRepository: HotelRepository,
    private readonly messageProcessor: MessageProcessor,
    private readonly priceCalculator: PriceCalculator,
    private readonly progressMeasuringService: ProgressMeasuringService,
  ) {
  }

  async processMessage(searchId: string, rawHotels: RawHotelDto[]): Promise<void> {
    logger.debug(`Processing message with searchId [${searchId}]`)
    const rawHotelsById = this.messageProcessor.processMessage(searchId, rawHotels)
    await this.fileRepository.save(JSON.stringify(Array.from(rawHotelsById.values())), searchId, 'raw-hotels')
    logger.debug(`Processing completed for message with searchId [${searchId}]`)

    const rawHotelIds = Array.from(rawHotelsById.keys())
    const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(searchId, Array.from(rawHotelsById.keys()))

    const hotelsToCreate = rawHotelIds
      .filter(hotelId => !foundHotels.has(hotelId))
      .map(hotelId => rawHotelsById.get(hotelId))

    if (hotelsToCreate.length) {
      const created = await this.hotelRepository.createAll(hotelsToCreate.map(h => this.hotelFactory.createNew(h)))
      logger.debug(`Hotels [${created.length}] were created based on data in message with searchId [${searchId}]`)
    }
    const updatedHotelsWithRaw = Array.from(foundHotels.keys()).map(hotelId => {
      const hotel = foundHotels.get(hotelId)
      const rawHotel = rawHotelsById.get(hotelId)
      return this.updateHotelWithRaw(hotel, rawHotel)
    })

    if (updatedHotelsWithRaw.length) {
      await this.hotelRepository.updateAll(updatedHotelsWithRaw)
      logger.debug(`Hotels [${updatedHotelsWithRaw.length}] were updated based on data in message with searchId [${searchId}]`)
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
