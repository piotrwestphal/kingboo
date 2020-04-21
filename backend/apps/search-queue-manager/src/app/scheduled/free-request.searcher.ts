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
    name: 'find-free-search-request-and-send',
  })
  findFreeSearchRequestAndSend() {
    console.debug(`Triggering job - find free search requests and send.`);
    const now = new Date();
    from(this.searchRequestRepository.findFreeSortedByPriority()).pipe(
      flatMap(v => v),
      filter((sr) => this.isExceededFrequencyThreshold(sr, now)),
      filter((sr) => this.isNotInPast(sr, now)),
    ).subscribe(async (searchRequest) => {
      const blocked = searchRequest.block();
      const updated = await this.searchRequestRepository.update(blocked);
      console.info(`Sending free scenario with search id [${searchRequest.searchId}]`);
      this.collectingScenarioSender.sendScenario(updated);
    });
  }

  private isExceededFrequencyThreshold = (doc: SearchRequest, now: Date): boolean =>
    new Date(doc.occupancyUpdatedAt) < new Date(now.getTime() - (doc.updateFrequencyMinutes * 60000));

  private isNotInPast = ({ searchId, checkInDate }: SearchRequest, now: Date): boolean => {
    const { day, month, year } = checkInDate;
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1; // JS thing
    const nowDay = now.getDate();
    if (nowYear > year
      || (nowYear === year) && (nowMonth > month)
      || (nowYear === year) && (nowMonth === month) && nowDay > day) {
      console.warn(`Search request with id: ${searchId} is in the past. Check in date: year: ${year}, month: ${month}, day: ${day}.`);
      return false;
    }
    return true;
  };
}
