import { Test, TestingModule } from '@nestjs/testing';
import { SearchRequestController } from './search-request.controller';
import { RMQSearchRequestSender } from './mq/rmq.search-request.sender';

describe('SearchRequestController', () => {
  let appController: SearchRequestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchRequestController],
      providers: [RMQSearchRequestSender],
    }).compile();

    appController = app.get<SearchRequestController>(SearchRequestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.send('dupa')).toBe('dupa');
    });
  });
});
