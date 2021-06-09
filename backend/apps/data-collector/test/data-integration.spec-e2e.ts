import { Test, TestingModule } from '@nestjs/testing'
import { TimeHelper } from '@kb/util'
import { DataCollectionNotificationSender } from '../src/core/abstract/data-collection-notification.sender'
import { DataToProcessSender } from '../src/core/abstract/data-to-process.sender'
import { RawHotel } from '../src/core/model/RawHotel'
import { FileRepository } from '@kb/storage'
import { RawSearchResult } from '../src/core/model/RawSearchResult'
import { CollectingScenarioDto, CollectingScenarioType } from '@kb/model'
import { CollectingScenarioProcessor } from '../src/app/collecting-scenario.processor'
import { AppModule } from '../src/app/app.module'

class MockDataCollectionNotificationSender {
  notifyAboutHotelsCollectionCompleted() {
    return
  }

  sendSearchPlaceIdentifier() {
    return
  }
}

class MockDataToProcessSender {
  sendHotelsPart() {
    return
  }

  sendHotelsSummary() {
    return
  }
}

describe('Data integration tests', () => {

  let app
  let collectingScenarioExecutor: CollectingScenarioProcessor
  let fileRepository: FileRepository

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).overrideProvider(DataCollectionNotificationSender)
      .useClass(MockDataCollectionNotificationSender)
      .overrideProvider(DataToProcessSender)
      .useClass(MockDataToProcessSender)
      .compile()

    app = moduleFixture.createNestApplication()
    collectingScenarioExecutor = moduleFixture.get(CollectingScenarioProcessor)
    fileRepository = moduleFixture.get(FileRepository)
    await app.init()
  })

  it('Scenario - 2 persons and 1 room', async (done) => {
    // given
    const mockSearchId = `2_persons_1_room_${Date.now()}`

    const day = TimeHelper.DAY_IN_MS
    const checkInDate = new Date(Date.now() + (7 * day))
    const checkOutDate = new Date(Date.now() + (10 * day))

    const collectingScenarioDto: CollectingScenarioDto = {
      resultsLimit: 25,
      type: CollectingScenarioType.COLLECT_HOTELS,
      searchPlace: 'New York',
      checkInDate: {
        year: checkInDate.getFullYear(),
        month: checkInDate.getMonth() + 1,
        day: checkInDate.getDate(),
      },
      checkOutDate: {
        year: checkOutDate.getFullYear(),
        month: checkOutDate.getMonth() + 1,
        day: checkOutDate.getDate(),
      },
      numberOfRooms: 1,
      numberOfAdults: 2,
      childrenAgeAtCheckout: [],
      searchPlaceIdentifier: null,
    }

    // when
    await collectingScenarioExecutor.process(mockSearchId, 1, collectingScenarioDto, Date.now())

    // then
    const mockFilePath = await fileRepository.findFilePath(mockSearchId, 'raw-search-result')
    const data = await fileRepository.get(mockFilePath)

    const {
      hotels,
      searchPlaceIdentifier,
    } = JSON.parse(data) as RawSearchResult

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('New York, New York State, United States')
    expect(searchPlaceIdentifier.destId).toBe('20088325')
    expect(searchPlaceIdentifier.destType).toBe('city')
    expect(searchPlaceIdentifier.placeIdLat).toBe('40.768074')
    expect(searchPlaceIdentifier.placeIdLon).toBe('-73.981895')

    verifyHotels(hotels)

    done()
  }, 120000)

  it('Scenario - 4 persons, 2 kids and 2 rooms', async (done) => {
    // given
    const mockSearchId = `4_persons_2_kids_2_rooms_${Date.now()}`

    const day = TimeHelper.DAY_IN_MS
    const checkInDate = new Date(Date.now() + (7 * day))
    const checkOutDate = new Date(Date.now() + (10 * day))

    const collectingScenarioDto: CollectingScenarioDto = {
      resultsLimit: 25,
      type: CollectingScenarioType.COLLECT_HOTELS,
      searchPlace: 'Berlin',
      checkInDate: {
        year: checkInDate.getFullYear(),
        month: checkInDate.getMonth() + 1,
        day: checkInDate.getDate(),
      },
      checkOutDate: {
        year: checkOutDate.getFullYear(),
        month: checkOutDate.getMonth() + 1,
        day: checkOutDate.getDate(),
      },
      numberOfRooms: 2,
      numberOfAdults: 4,
      childrenAgeAtCheckout: [2, 3],
      searchPlaceIdentifier: null,
    }

    // when
    await collectingScenarioExecutor.process(mockSearchId, 1, collectingScenarioDto, Date.now())

    // then
    const mockFilePath = await fileRepository.findFilePath(mockSearchId, 'raw-search-result')
    const data = await fileRepository.get(mockFilePath)

    const {
      hotels,
      searchPlaceIdentifier,
    } = JSON.parse(data) as RawSearchResult

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('Berlin, Berlin Federal State, Germany')
    expect(searchPlaceIdentifier.destId).toBe('-1746443')
    expect(searchPlaceIdentifier.destType).toBe('city')
    expect(searchPlaceIdentifier.placeIdLat).toBe('52.516214')
    expect(searchPlaceIdentifier.placeIdLon).toBe('13.376817')

    verifyHotels(hotels)
    // verify rooms
    hotels.map(v => v.rooms).forEach(v => {
      console.log('Rooms', { v })
    })
    done()
  }, 120000)

  afterEach(async () => {
    await app.close()
  })
})

const verifyHotels = (hotels: RawHotel[]) => {
  hotels.forEach(({
                    hotelId,
                    name,
                    price,
                    distanceFromCenter,
                    distanceFromCenterOrderIndex,
                    districtName,
                    coords,
                    hotelLink,
                  }: RawHotel) => {
    notEmpty(hotelId)
    notEmpty(name)
    notEmpty(price)
    notEmpty(distanceFromCenter)
    notEmpty(distanceFromCenterOrderIndex)
    notEmpty(districtName)
    notEmpty(coords)
    notEmpty(hotelLink)
  })
  expect(hotels.some(({ rate }) => !!rate)).toBeTruthy()
  expect(hotels.some(({ secondaryRateType }) => !!secondaryRateType)).toBeTruthy()
  expect(hotels.some(({ secondaryRate }) => !!secondaryRate)).toBeTruthy()
  expect(hotels.some(({ numberOfReviews }) => !!numberOfReviews)).toBeTruthy()
  expect(hotels.some(({ starRating }) => !!starRating)).toBeTruthy()
  expect(hotels.some(({ bonuses }) => !!bonuses)).toBeTruthy()

  // check if distance is ordered
  hotels.map(v => v.distanceFromCenter)
    .map(v => v.replace(/\D/g, ''))
    .map(v => parseInt(v, 10))
    .reduce((prev, curr) => {
      expect(prev <= curr).toBeTruthy()
      return curr
    })
}

const notEmpty = (value: any) => {
  expect(value).not.toBeNull()
  expect(value).not.toBeUndefined()
  expect(value).not.toBe('')
}

