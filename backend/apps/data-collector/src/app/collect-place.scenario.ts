import { Injectable } from '@nestjs/common'
import { ScenarioRunner } from '../core/scenario.runner'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'
import { DataToProcessSender } from '../core/abstract/data-to-process.sender'
import { PlaceCollector } from './place.collector'
import { RawHotelMapper } from './mapper/raw-hotel.mapper'
import { PlaceCollectingScenario } from '../core/interface/place-collecting-scenario'

@Injectable()
export class CollectPlaceScenario implements ScenarioRunner {

  constructor(
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly placeCollector: PlaceCollector,
  ) {
  }

  async run(searchId: string,
            collectingScenario: PlaceCollectingScenario,
            searchPlaceIdentifier: SearchPlaceIdentifier,
            startedAt: Date): Promise<Date> {
    const rawHotel = await this.placeCollector.collectPlace(searchId, collectingScenario, searchPlaceIdentifier)
    const rawHotelDto = RawHotelMapper.toDto(rawHotel)
    const finishedAt = new Date()
    if (rawHotel) {
      this.dataToProcessSender.sendPlaceSummary(searchId, rawHotelDto, startedAt, finishedAt)
    }
    return finishedAt
  }
}
