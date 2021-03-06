import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { mergeMap } from 'rxjs/operators';
import { CollectingScenarioSender } from '../../core/abstract/collecting-scenario.sender';
import { Injectable } from '@nestjs/common';
import { logger } from '../../logger';

@Injectable()
export class FreeRequestSearcher {

  constructor(
    private readonly collectingScenarioSender: CollectingScenarioSender,
    private readonly searchRequestRepository: SearchRequestRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'find-free-search-requests',
  })
  findFreeSearchRequestsAndSend(): void {
    logger.debug(`Triggering job [find-free-search-requests]`);
    const now = new Date();
    from(this.searchRequestRepository.findFree(now)).pipe(
      mergeMap(v => v),
    ).subscribe(async (searchRequest) => {
      const blocked = searchRequest.scheduleNextSearch(now);
      const updated = await this.searchRequestRepository.update(blocked);
      logger.info(`Sending free scenario with search id [${searchRequest.searchId}]`);
      this.collectingScenarioSender.sendScenario(updated);
    });
  }
}
