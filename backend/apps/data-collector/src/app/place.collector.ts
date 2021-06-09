import { AppConfigService } from '../config/app-config.service'
import { FileRepository } from '@kb/storage'
import { ScraperFacade } from '../scrap/scraper.facade'
import { Injectable } from '@nestjs/common'
import { CollectingScenario } from '../core/interface/collecting-scenario'
import { RawSearchResult } from '../core/model/RawSearchResult'
import { TimeHelper } from '@kb/util'
import { logger } from '../logger'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'
import { RawHotelMapper } from './mapper/raw-hotel.mapper'
import { RawHotel } from '../core/model/RawHotel'

@Injectable()
export class PlaceCollector {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly fileRepository: FileRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
  }

  async collectPlace(searchId: string,
                     collectPlaceScenario: CollectingScenario,
                     searchPlaceIdentifier: SearchPlaceIdentifier): Promise<RawHotel> {
    const startCollectingHotelsTimeMs = Date.now()
    const rawSearchResult = new RawSearchResult(searchId, searchPlaceIdentifier)

    const resultPageUri = this.scraperFacade.buildResultPageUri(searchPlaceIdentifier, collectPlaceScenario)
    const enableStylesOnResultsPage = this.appConfigService.enableStylesOnResultsPage
    await this.scraperFacade.prepareResultList(resultPageUri, enableStylesOnResultsPage)
    const scrapedRawHotel = await this.scraperFacade.collectFirstHotelFromCurrentPage()

    const rawHotel = RawHotelMapper.fromScrapedRawHotel(scrapedRawHotel, 0, new Date().toISOString())
    rawSearchResult.addHotelsAfterCollectingFinish([rawHotel])

    const collectingTimeSec = TimeHelper.getDiffTimeInSeconds(startCollectingHotelsTimeMs)
    logger.info(`Collecting place last [${collectingTimeSec}] sec`)
    rawSearchResult.setCollectingTime(collectingTimeSec)

    logger.debug(`Saving raw search result with id [${rawSearchResult.searchId}] to db.`)
    await this.fileRepository.save(JSON.stringify(rawSearchResult), searchId, 'raw-search-result')
    return rawHotel
  }
}
