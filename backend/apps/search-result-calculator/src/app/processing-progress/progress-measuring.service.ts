import { DataUpdateSender } from '../../core/abstract/data-update.sender'
import { ProcessingProgressRepository } from '../../core/abstract/processing-progress.repository'
import { ProcessingProgressType } from '../../core/processing-actvity.type'
import { logger } from '../../logger'
import { HotelsSummaryData } from '../../core/interface/hotels-summary-data'

export class ProgressMeasuringService {

  constructor(
    private readonly dataUpdateSender: DataUpdateSender,
    private readonly processingProgressRepository: ProcessingProgressRepository,
  ) {
  }

  async setProgress(searchId: string): Promise<void> {
    const created = await this.processingProgressRepository.create({
      searchId,
      type: ProcessingProgressType.PART
    })
    logger.info(`Created hotels part with search id ${created.searchId}`)
    const foundSummary = await this.processingProgressRepository.findByType(searchId, ProcessingProgressType.SUMMARY)
    if (foundSummary) {
      const { expectedNumberOfParts, collectingStartedAt, collectingFinishedAt } = foundSummary.data
      const partsCount = await this.processingProgressRepository.getQuantityOfType(searchId, ProcessingProgressType.PART)
      if (expectedNumberOfParts === partsCount) {
        await this.summarize(searchId, collectingStartedAt, collectingFinishedAt)
        logger.debug(`The summary for search id [${searchId}] arrived before the last hotels was processed`)
      }
    }
  }

  async summarizeProgress(searchId: string, data: HotelsSummaryData): Promise<void> {
    const created = await this.processingProgressRepository.create({
      searchId,
      type: ProcessingProgressType.SUMMARY,
      data
    })
    logger.info(`Created hotels summary with search id ${searchId}`)
    const { expectedNumberOfParts, collectingStartedAt, collectingFinishedAt } = created.data
    const partsCount = await this.processingProgressRepository.getQuantityOfType(searchId, ProcessingProgressType.PART)
    if (expectedNumberOfParts <= partsCount) {
      await this.summarize(searchId, collectingStartedAt, collectingFinishedAt)
      logger.info(`All hotels parts for search id [${searchId}] were processed and the progress could be summarized`)
      if (expectedNumberOfParts < partsCount) {
        logger.warn(`There were more parts [${partsCount}] than expected [${expectedNumberOfParts}] but process was summarized`)
      }
    }
  }

  private async summarize(searchId: string,
                          collectingStartedAt: string,
                          collectingFinishedAt: string): Promise<void> {
    const deletedCount = await this.processingProgressRepository.deleteMany(searchId)
    logger.debug(`Deleted [${deletedCount}] processing progress elements (parts + summary) with search id [${searchId}]`)
    this.dataUpdateSender.notifyAboutHotelsProcessingFinished(searchId, collectingStartedAt, collectingFinishedAt)
  }
}
