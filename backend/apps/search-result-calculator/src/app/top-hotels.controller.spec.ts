import { Test, TestingModule } from '@nestjs/testing';
import { TopHotelsController } from './top-hotels.controller';
import { TopHotelsService } from './top-hotels.service';

describe('AppController', () => {
  let appController: TopHotelsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TopHotelsController],
      providers: [TopHotelsService],
    }).compile();

    appController = app.get<TopHotelsController>(TopHotelsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getTopHotels('mockSearchId')).toBe('Hello World!');
    });
  });
});
