import { Test, TestingModule } from '@nestjs/testing';
import { SearchRequestController } from './search-request.controller';
import { RmqUserNotificationsSender } from '../mq/rmq-user-notifications.sender';

describe('SearchRequestController', () => {
  let appController: SearchRequestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchRequestController],
      providers: [RmqUserNotificationsSender],
    }).compile();

    appController = app.get<SearchRequestController>(SearchRequestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.send({} as any)).toBe('dupa');
    });
  });
});
