import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender'
import { FileRepository } from '@kb/storage'
import { ScraperFacade } from '../scrap/scraper.facade'
import { ScenarioRunner } from '../core/scenario.runner'
import { CollectingScenario } from '../core/interface/collecting-scenario'
import { logger } from '../logger'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'

@Injectable()
export class CollectingScenarioExecutor {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly dataCollectionNotificationSender: DataCollectionNotificationSender,
    private readonly fileRepository: FileRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
  }

  async execute(scenario: ScenarioRunner,
                searchId: string,
                collectingScenario: CollectingScenario,
                searchPlaceIdentifier: SearchPlaceIdentifier | null): Promise<void> {
    try {
      const startedAt = new Date()
      logger.info(`Collecting scenario started for searchId [${searchId}] collectingScenario:`, collectingScenario)
      await this.scraperFacade.initializeBrowser(this.appConfigService.puppeteerLaunchOptions)
      const existingSearchPlaceIdentifier = await this.collectSearchPlaceIdentifierIfNotPresentAndNotify(
        searchId, collectingScenario.searchPlace, searchPlaceIdentifier)
      const finishedAt = await scenario.run(searchId, collectingScenario, existingSearchPlaceIdentifier, startedAt)
      this.dataCollectionNotificationSender.notifyAboutHotelsCollectionCompleted(searchId, startedAt, finishedAt)
      logger.info(`Collecting scenario finished for searchId [${searchId}]. Scrap started at [${startedAt.toISOString()}], ` +
        `scrap finished at [${finishedAt.toISOString()}].`)
    } catch (err) {
      logger.error(`Error during scenario execution for searchId [${searchId}]`, err.message)
      const image = await this.scraperFacade.takeScreenshot() as string
      await this.fileRepository.save(image, 'error-during-collecting-data', 'screenshot', 'png')
    } finally {
      await this.scraperFacade.performCleaningAfterScraping()
    }
  }

  private async collectSearchPlaceIdentifierIfNotPresentAndNotify(searchId: string,
                                                                  searchPlace: string,
                                                                  searchPlaceIdentifier: SearchPlaceIdentifier): Promise<SearchPlaceIdentifier> {
    if (searchPlaceIdentifier) {
      return searchPlaceIdentifier
    }
    const collectedSearchPlaceIdentifier = await this.scraperFacade.collectSearchPlaceIdentifier(searchPlace)
    if (!collectedSearchPlaceIdentifier.destId) {
      const image = await this.scraperFacade.takeScreenshot() as string
      await this.fileRepository.save(image, 'missing-dest-id', 'screenshot', 'png')
    }

    this.dataCollectionNotificationSender.sendSearchPlaceIdentifier(searchId, collectedSearchPlaceIdentifier)
    return collectedSearchPlaceIdentifier
  }
}
