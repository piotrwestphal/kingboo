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
import { RawRoom } from '../src/core/model/RawRoom'

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

  sendPlaceSummary() {
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

  it('Collect hotels scenario - 2 persons and 1 room', async (done) => {
    // given
    const mockSearchId = `${Date.now()}_collect_hotels_2_persons_1_room`

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

    const { hotels, searchPlaceIdentifier } = JSON.parse(data) as RawSearchResult

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('New York, New York State, United States')
    expect(searchPlaceIdentifier.destId).toBe('20088325')
    expect(searchPlaceIdentifier.destType).toBe('city')
    expect(searchPlaceIdentifier.placeIdLat).toBe('40.768074')
    expect(searchPlaceIdentifier.placeIdLon).toBe('-73.981895')

    verifyRequiredHotelsFields(hotels)
    verifyOptionalHotelsFields(hotels)
    expect(hotels.some(({ roomName }) => !!roomName)).toBeTruthy()
    expect(hotels.some(({ bonuses }) => !!bonuses)).toBeTruthy()

    done()
  }, 120000)

  it('Collect hotels scenario - 4 persons, 2 kids and 2 rooms', async (done) => {
    // given
    const mockSearchId = `${Date.now()}_collect_hotels_4_persons_2_kids_2_rooms`

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

    const { hotels, searchPlaceIdentifier } = JSON.parse(data) as RawSearchResult

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('Berlin, Berlin Federal State, Germany')
    expect(searchPlaceIdentifier.destId).toBe('-1746443')
    expect(searchPlaceIdentifier.destType).toBe('city')
    expect(searchPlaceIdentifier.placeIdLat).toBe('52.516214')
    expect(searchPlaceIdentifier.placeIdLon).toBe('13.376817')

    verifyRequiredHotelsFields(hotels)
    verifyOptionalHotelsFields(hotels)
    verifyRequiredRoomsFields(hotels)
    verifyOptionalRoomsFields(hotels)

    done()
  }, 120000)

  it('Collect place scenario - 2 persons and 1 room', async (done) => {
    // given
    const mockSearchId = `${Date.now()}_collect_place_2_persons_1_room`

    const day = TimeHelper.DAY_IN_MS
    const checkInDate = new Date(Date.now() + (7 * day))
    const checkOutDate = new Date(Date.now() + (10 * day))

    const collectingScenarioDto: CollectingScenarioDto = {
      resultsLimit: 1,
      type: CollectingScenarioType.COLLECT_PLACE,
      searchPlace: 'Maciejewka Zachoczewie',
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

    const { hotels, searchPlaceIdentifier } = JSON.parse(data) as RawSearchResult

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('Maciejewka, Zahoczewie, Poland')
    expect(searchPlaceIdentifier.destId).toBe('ChIJ8b0rRAMJPEcRWL2xlS-_akc')
    expect(searchPlaceIdentifier.destType).toBe('landmark')
    expect(searchPlaceIdentifier.placeIdLat).toBe('49.381289')
    expect(searchPlaceIdentifier.placeIdLon).toBe('22.259844')

    const hotel = hotels[0]
    notEmpty(hotel)

    const { hotelId, name, distanceFromCenterOrderIndex, districtName, coords, hotelLink } = hotel
    expect(hotelId).toBe('TWFjaWVqZXdrYSAyMi4yNjA0NTE5MTI4Nzk5LDQ5LjM4MTEyNjkwMTA4NzU=')
    expect(name).toContain('Maciejewka')
    // expect(distanceFromCenter).toContain('0.5 km from') on github it shows distance in miles
    expect(distanceFromCenterOrderIndex).toBe(0)
    expect(districtName).toContain('Zahoczewie')
    expect(coords).toBe('22.2604519128799,49.3811269010875')
    notEmpty(hotelLink)

    done()
  }, 120000)

  it('Collect place scenario - 4 persons, 2 kids and 2 rooms', async (done) => {
    // given
    const mockSearchId = `${Date.now()}_collect_place_4_persons_2_kids_2_rooms`

    const day = TimeHelper.DAY_IN_MS
    const checkInDate = new Date(Date.now() + (7 * day))
    const checkOutDate = new Date(Date.now() + (10 * day))

    const collectingScenarioDto: CollectingScenarioDto = {
      resultsLimit: 1,
      type: CollectingScenarioType.COLLECT_PLACE,
      searchPlace: 'Puro Warszawa',
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
      childrenAgeAtCheckout: [2, 8],
      searchPlaceIdentifier: null,
    }

    // when
    await collectingScenarioExecutor.process(mockSearchId, 1, collectingScenarioDto, Date.now())

    // then
    const mockFilePath = await fileRepository.findFilePath(mockSearchId, 'raw-search-result')
    const data = await fileRepository.get(mockFilePath)

    const { hotels, searchPlaceIdentifier } = JSON.parse(data) as RawSearchResult

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('PURO Warszawa Centrum, Warsaw, Masovia, Poland')
    expect(searchPlaceIdentifier.destId).toBe('4675390')
    expect(searchPlaceIdentifier.destType).toBe('hotel')
    expect(searchPlaceIdentifier.placeIdLat).toBe('52.231203')
    expect(searchPlaceIdentifier.placeIdLon).toBe('21.015043')

    const hotel = hotels[0]
    notEmpty(hotel)

    const { hotelId, name, distanceFromCenter, distanceFromCenterOrderIndex, districtName, coords, hotelLink } = hotel
    expect(hotelId).toBe('UFVSTyBXYXJzemF3YSBDZW50cnVtIDIxLjAxNTA0Myw1Mi4yMzEyMDM=')
    expect(name).toContain('PURO Warszawa Centrum')
    expect(['0.5 km from centre', '0.3 miles from centre']).toContain(distanceFromCenter)
    expect(distanceFromCenterOrderIndex).toBe(0)
    expect(districtName).toContain('Sródmiescie, Warsaw')
    expect(coords).toBe('21.015043,52.231203')
    notEmpty(hotelLink)

    done()
  }, 120000)

  afterEach(async () => {
    await app.close()
  })
})

const verifyRequiredHotelsFields = (hotels: RawHotel[]) => {
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

  // check if distance is ordered
  hotels.map(v => v.distanceFromCenter)
    .map(v => v.replace(/[^0-9.]/g, ''))
    .map(v => parseFloat(v))
    .reduce((prev, curr) => {
      expect(prev <= curr).toBeTruthy()
      return curr
    })
}

const verifyOptionalHotelsFields = (hotels: RawHotel[]) => {
  expect(hotels.some(({ rate }) => !!rate)).toBeTruthy()
  expect(hotels.some(({ secondaryRateType }) => !!secondaryRateType)).toBeTruthy()
  expect(hotels.some(({ secondaryRate }) => !!secondaryRate)).toBeTruthy()
  expect(hotels.some(({ numberOfReviews }) => !!numberOfReviews)).toBeTruthy()
  expect(hotels.some(({ starRating }) => !!starRating)).toBeTruthy()
}

const verifyRequiredRoomsFields = (hotels: RawHotel[]) => {
  hotels.map(h => h.rooms)
    .reduce((prev, curr) => curr.concat(prev))
    .forEach(({
                shortDescription,
                personCount,
                beds,
              }: RawRoom) => {
      notEmpty(shortDescription)
      notEmpty(personCount)
      notEmpty(beds)
    })
}

const verifyOptionalRoomsFields = (hotels: RawHotel[]) => {
  const allRooms = hotels.map(h => h.rooms)
    .reduce((prev, curr) => curr.concat(prev))
  expect(allRooms.some(({ bonuses }) => !!bonuses)).toBeTruthy()
  expect(allRooms.some(({ longDescription }) => !!longDescription)).toBeTruthy()
}

const notEmpty = (value: any) => {
  expect(value).not.toBeNull()
  expect(value).not.toBeUndefined()
  expect(value).not.toBe('')
}

