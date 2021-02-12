import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {AppModule} from '../src/app.module';
import {ClientProviderOptions, ClientRMQ, ClientsModule, RmqOptions, Transport} from '@nestjs/microservices';
import {Observable} from "rxjs";
import {DataCollectionNotificationConsumer} from "../src/data-collection-notification-consumer";

const rmqDataCollectionNotificationsOptions: ClientProviderOptions = {
  name: 'clientRMQ',
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://dev:dev@localhost:5672'],
    queue: 'collecting-scenario'
  }
}

const rmqConsumerOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://dev:dev@localhost:5672'],
    queue: 'data-collection-notifications',
  },
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let clientRmq: ClientRMQ;
  let dataQueue: Observable<any>;
  let searchPlaceQueue: Observable<any>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([rmqDataCollectionNotificationsOptions]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<RmqOptions>(rmqConsumerOptions);
    await app.startAllMicroservicesAsync()
    await app.init();
    clientRmq = app.get<ClientRMQ>('clientRMQ')
    dataQueue = app.get<DataCollectionNotificationConsumer>(DataCollectionNotificationConsumer).getDataQueue();
    searchPlaceQueue = app.get<DataCollectionNotificationConsumer>(DataCollectionNotificationConsumer).getSearchPlaceQueue();
  });

  afterAll(async () => {
    await app.close();
    clientRmq.close();
  })

  it('Data collector Test 1', async (done) => {
    console.log('DUPA');
    const collectHotelsScenario = {
      searchId: '1',
      timeStamp: Date.now(),
      updateFrequencyMinutes: 5,
      scenario: {
        resultsLimit: 20,
        searchPlace: 'Warsaw',
        checkInDate: {
          year: 2021,
          month: 3,
          day: 1,
        },
        checkOutDate: {
          year: 2021,
          month: 3,
          day: 7,
        },
        numberOfRooms: 1,
        numberOfAdults: 2,
        childrenAgeAtCheckout: [],
        searchPlaceIdentifier: null,
      }
    }
    clientRmq.emit('NEW_SCENARIO', collectHotelsScenario);
    searchPlaceQueue.subscribe(
      (msg) => {
        expect(msg.searchId).toBe('1')
        expect(msg.data.searchPlaceIdentifier).toBe('Warsaw, Masovia, Poland')
      });
    // (err) => done.fail(`Should consume ${'SEARCH_PLACE_COLLECTION_COMPLETED'} message within 20 sec`))
    dataQueue.subscribe(
      (msg) => {
        expect(msg.searchId).toBe('1')
        done()
      });
    // (err) => done.fail(`Should consume ${'DATA_COLLECTION_FINISHED'} message within 60 sec`))
  }, 60000);
});
