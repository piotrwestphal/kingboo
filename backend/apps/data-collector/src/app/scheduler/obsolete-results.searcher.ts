import { Cron, CronExpression } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'
import { RawSearchResultRepository } from '../../core/abstract/raw-search-result.repository'
import { AppConfigService } from '../../config/app-config.service'
import { logger } from '../../logger'

@Injectable()
export class ObsoleteResultsSearcher {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly rawSearchResultRepository: RawSearchResultRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'find-obsolete-raw-search-results',
  })
  async findObsoleteRawSearchResults(): Promise<void> {
    logger.debug(`Triggering job [find-obsolete-raw-search-results]`);
    const docIds = await this.rawSearchResultRepository.deleteOlderThanGivenHours(this.appConfigService.rawResultRetentionHours);
    if (docIds.length) {
      logger.info(`Deleted [${docIds.length}] raw search results due to obsolescence. Doc ids: ${docIds}`);
    }
  }
}
