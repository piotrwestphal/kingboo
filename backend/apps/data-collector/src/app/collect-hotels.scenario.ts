import { Injectable } from '@nestjs/common'
import { DataToProcessSender } from '../core/abstract/data-to-process.sender'
import { HotelsCollector } from './hotels.collector'
import { ScenarioRunner } from '../core/scenario.runner'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'
import { HotelsCollectingScenario } from '../core/interface/hotels-collecting-scenario'

@Injectable()
export class CollectHotelsScenario implements ScenarioRunner {

  constructor(
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly hotelsCollector: HotelsCollector,
  ) {
  }

  async run(searchId: string,
            collectingScenario: HotelsCollectingScenario,
            searchPlaceIdentifier: SearchPlaceIdentifier,
            startedAt: Date): Promise<Date> {
    const expectedNumberOfParts = await this.hotelsCollector.collectHotels(searchId, collectingScenario, searchPlaceIdentifier)
    const finishedAt = new Date()
    if (expectedNumberOfParts) {
      this.dataToProcessSender.sendHotelsSummary(searchId, expectedNumberOfParts, startedAt, finishedAt)
    }
    return finishedAt
  }
}
