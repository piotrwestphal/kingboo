import { MessageProcessor } from '../../processing/message.processor'
import { HotelRepository } from '../../core/abstract/hotel.repository'
import { RawHotelDto } from '@kb/model'
import { HotelFactory } from './hotel.factory'
import { RawHotel } from '../../core/interface/raw-hotel'
import { logger } from '../../logger'
import { ProgressMeasuringService } from '../processing-progress/progress-measuring.service'
import { FileRepository } from '@kb/storage'
import { HotelUpdater } from './hotel.updater'
import { PlaceSummaryData } from '../../core/interface/place-summary-data'
import { DataUpdateSender } from '../../core/abstract/data-update.sender'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HotelService {

  constructor(
    private readonly dataUpdateSender: DataUpdateSender,
    private readonly fileRepository: FileRepository,
    private readonly hotelFactory: HotelFactory,
    private readonly hotelRepository: HotelRepository,
    private readonly hotelUpdater: HotelUpdater,
    private readonly messageProcessor: MessageProcessor,
    private readonly progressMeasuringService: ProgressMeasuringService,
  ) {
  }

  async processPlaceSummaryMessage(searchId: string,
                                   {
                                     rawHotelDto,
                                     collectingStartedAt,
                                     collectingFinishedAt
                                   }: PlaceSummaryData): Promise<void> {
    logger.debug(`Processing message with searchId [${searchId}]`)
    try {
      const rawHotel = this.messageProcessor.process(searchId, rawHotelDto)
      await this.fileRepository.save(JSON.stringify(rawHotel), searchId, 'raw-place-summary')

      const foundHotel = await this.hotelRepository.findBySearchIdAndHotelId(searchId, rawHotel.hotelId)
      if (foundHotel) {
        const updatedWithRaw = this.hotelUpdater.updateHotelWithRaw(foundHotel, rawHotel)
        const updated = await this.hotelRepository.update(updatedWithRaw)
        logger.debug(`Hotel with id [${updated.hotelId}] was updated based on data in message with searchId [${searchId}]`)
      } else {
        const newHotel = this.hotelFactory.createNew(rawHotel)
        const created = await this.hotelRepository.create(newHotel)
        logger.debug(`Hotel with id [${created.hotelId}] was created based on data in message with searchId [${searchId}]`)
      }
      this.dataUpdateSender.notifyAboutPlaceProcessingFinished(searchId, collectingStartedAt, collectingFinishedAt)
      logger.debug(`Processing completed for message with searchId [${searchId}]`)
    } catch (err) {
      logger.error(`Error during processing place summary message for searchId [${searchId}]`, err)
    }
  }

  async processHotelsPartMessage(searchId: string, rawHotels: RawHotelDto[]): Promise<void> {
    logger.debug(`Processing message with searchId [${searchId}]`)
    try {
      const rawHotelsById = this.processRawHotels(searchId, rawHotels)
      await this.fileRepository.save(JSON.stringify(Array.from(rawHotelsById.values())), searchId, 'raw-hotels-part')

      const rawHotelIds = Array.from(rawHotelsById.keys())
      const foundHotels = await this.hotelRepository.findAllBySearchIdAndHotelId(searchId, Array.from(rawHotelsById.keys()))

      const hotelsToCreate = rawHotelIds
        .filter(hotelId => !foundHotels.has(hotelId))
        .map(hotelId => rawHotelsById.get(hotelId))

      if (hotelsToCreate.length) {
        const newHotels = hotelsToCreate.map(h => this.hotelFactory.createNew(h))
        const created = await this.hotelRepository.createAll(newHotels)
        logger.debug(`Hotels [${created.length}] were created based on data in message with searchId [${searchId}]`)
      }
      const updatedHotelsWithRaw = Array.from(foundHotels.keys()).map(hotelId => {
        const hotel = foundHotels.get(hotelId)
        const rawHotel = rawHotelsById.get(hotelId)
        return this.hotelUpdater.updateHotelWithRaw(hotel, rawHotel)
      })

      if (updatedHotelsWithRaw.length) {
        const updatedCount = await this.hotelRepository.updateAll(updatedHotelsWithRaw)
        logger.debug(`Hotels [${updatedCount}] were updated based on data in message with searchId [${searchId}]`)
      }
      logger.debug(`Processing completed for message with searchId [${searchId}]`)
    } catch (err) {
      logger.error(`Error during processing hotel part message for searchId [${searchId}]`, err)
    }
    this.progressMeasuringService.setProgress(searchId)
  }

  private processRawHotels(searchId: string, rawHotelsDto: RawHotelDto[]): Map<string, RawHotel> {
    return rawHotelsDto.reduce((map: Map<string, RawHotel>, dto) => {
      const rawHotel = this.messageProcessor.process(searchId, dto)
      return map.set(rawHotel.hotelId, rawHotel)
    }, new Map<string, RawHotel>())
  }
}
