import { UserNotificationSender } from '../../core/abstract/user-notification.sender';
import { ProcessingProgressRepository } from '../../core/abstract/processing-progress.repository';
import { ProcessingProgressType } from '../../core/processing-actvity.type';
import { logger } from '../../logger';
import { HotelsSummaryData } from '../../core/interface/hotels-summary-data';

export class ProgressMeasuringService {

  constructor(
    private readonly processingProgressRepository: ProcessingProgressRepository,
    private readonly userNotificationSender: UserNotificationSender,
  ) {
  }

  public async setProgress(searchId: string): Promise<void> {
    const created = await this.processingProgressRepository.create({
      searchId,
      type: ProcessingProgressType.PART
    })
    logger.debug(`Created hotels part with search id ${created.searchId}`)
    const foundSummary = await this.processingProgressRepository.findByType(searchId, ProcessingProgressType.SUMMARY)
    if (foundSummary) {
      const summarized = await this.determineProgress(searchId, foundSummary.data)
      if (summarized) {
        logger.debug(`The summary for search id [${searchId}] arrived before the last hotels was processed`)
      }
    }
  }

  public async summarizeProgress(searchId: string, data: HotelsSummaryData): Promise<void> {
    const created = await this.processingProgressRepository.create({
      searchId,
      type: ProcessingProgressType.SUMMARY,
      data
    })
    logger.debug(`Created hotels summary with search id ${searchId}`)
    const summarized = await this.determineProgress(created.searchId, created.data)
    if (summarized) {
      logger.debug(`All hotels parts for search id [${searchId}] were processed and the progress could be summarized`)
    }
  }

  private async determineProgress(searchId: string, data: HotelsSummaryData): Promise<boolean> {
    const partsCount = await this.processingProgressRepository.getQuantityOfType(searchId, ProcessingProgressType.PART)
    const eligibleToSummarize = partsCount === data.expectedNumberOfParts
    if (eligibleToSummarize) {
      const deletedCount = await this.processingProgressRepository.deleteMany(searchId)
      logger.debug(`Deleted [${deletedCount}] processing progress elements (parts + summary)`)
      const { collectingStartedAt, collectingFinishedAt } = data
      this.userNotificationSender.notifyAboutHotelsProcessingFinished(searchId, collectingStartedAt, collectingFinishedAt)
    } else {
      logger.debug(`Still waiting for all hotels parts with search id [${searchId}] to be processed`)
    }
    return eligibleToSummarize
  }
}
