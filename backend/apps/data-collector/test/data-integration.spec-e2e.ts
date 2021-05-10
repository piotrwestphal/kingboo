import { Test, TestingModule } from '@nestjs/testing';
import { logger } from '../src/logger';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../src/config/environments';
import { AppConfigService } from '../src/config/app-config.service';
import { ScrapModule } from '../src/scrap/scrap.module';
import { DataCollectorService } from '../src/core/abstract/data-collector.service';
import { AppDataCollectorService } from '../src/app/app-data-collector.service';
import { FileManager, TimeHelper } from '@kb/util';
import { HotelsCollector } from '../src/app/hotels.collector';
import { DataCollectionNotificationSender } from '../src/core/abstract/data-collection-notification.sender';
import { DataToProcessSender } from '../src/core/abstract/data-to-process.sender';
import { RawSearchResultRepository } from '../src/core/abstract/raw-search-result.repository';
import { DbModule } from '../src/db/db.module';
import { CollectHotelsScenario } from '../src/core/interface/collect-hotels-scenario';
import { RawHotel } from '../src/core/model/RawHotel'

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

const notEmpty = (value: any) => {
  expect(value).not.toBeNull()
  expect(value).not.toBeUndefined()
  expect(value).not.toBe('')
}

describe('Data integration tests', () => {
  let app;
  let dataCollectorService: DataCollectorService;
  let rawSearchResultRepository: RawSearchResultRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
        DbModule,
        ScrapModule,
      ],
      providers: [
        {
          provide: DataCollectorService,
          useClass: AppDataCollectorService,
        },
        {
          provide: FileManager,
          useFactory: () => new FileManager(logger),
        },
        {
          provide: DataCollectionNotificationSender,
          useClass: MockDataCollectionNotificationSender,
        },
        {
          provide: DataToProcessSender,
          useClass: MockDataToProcessSender,
        },
        HotelsCollector,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    dataCollectorService = moduleFixture.get(DataCollectorService)
    rawSearchResultRepository = moduleFixture.get(RawSearchResultRepository)
    await app.init()
  });

  beforeEach(async () => {
    // TODO: create cassandra keyspace
    // TODO: create cassandra table
    // TODO: afterEach delete cassandra table
    await rawSearchResultRepository.deleteAll();
  })

  it('Scenario - 2 persons and 1 room', async (done) => {
    // given
    const mockSearchId = 'test1'
    const startTestDate = new Date()
    const day = TimeHelper.DAY_IN_MS
    const checkInDate = new Date(Date.now() + (7 * day))
    const checkOutDate = new Date(Date.now() + (10 * day))

    const collectHotelsScenario: CollectHotelsScenario = {
      resultsLimit: 25,
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
    await dataCollectorService.collectData(mockSearchId, 1, collectHotelsScenario, Date.now())

    // then
    const {
      hotels,
      searchPlaceIdentifier,
    } = await rawSearchResultRepository.find(mockSearchId, startTestDate);

    hotels.forEach((v) => {
      // DEBUG purposes
      logger.debug(`Collected [rawSearchResultDocument] with hotelId [${v.hotelId}] from db`, v)
    })

    notEmpty(searchPlaceIdentifier)
    expect(searchPlaceIdentifier.destination).toBe('New York, New York State, United States')
    expect(searchPlaceIdentifier.destId).toBe('20088325')
    expect(searchPlaceIdentifier.destType).toBe('city')
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
    done()
  }, 120000);

  afterAll(async () => {
    await app.close()
  });
});

