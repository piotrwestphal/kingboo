import { Test, TestingModule } from '@nestjs/testing';
import { RabbitClient } from './rabbit.client';

describe('RabbitClient', () => {
  let service: RabbitClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitClient],
    }).compile();

    service = module.get<RabbitClient>(RabbitClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
