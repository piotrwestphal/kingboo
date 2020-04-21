import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { filter, flatMap } from 'rxjs/operators';
import { SearchRequest } from '../../core/model/SearchRequest';
import { CollectingScenarioSender } from '../../core/abstract/collecting-scenario.sender';
import { Injectable } from '@nestjs/common';

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
  findFreeSearchRequestsAndSend() {
    console.debug(`Triggering job [find-free-search-requests]`);
    const now = new Date();
    from(this.searchRequestRepository.findValidSortedByPriority()).pipe(
      flatMap(v => v),
      filter((sr) => this.isExceededFrequencyThreshold(sr, now)),
    ).subscribe(async (searchRequest) => {
      const blocked = searchRequest.block();
      const updated = await this.searchRequestRepository.update(blocked);
      console.info(`Sending free scenario with search id [${searchRequest.searchId}]`);
      this.collectingScenarioSender.sendScenario(updated);
    });
  }

  private isExceededFrequencyThreshold = (doc: SearchRequest, now: Date): boolean =>
    new Date(doc.occupancyUpdatedAt) < new Date(now.getTime() - (doc.updateFrequencyMinutes * 60000))
}
