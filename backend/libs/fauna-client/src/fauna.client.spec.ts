import { Test, TestingModule } from '@nestjs/testing';
import { FaunaClient } from './fauna.client';

describe('FaunaClient', () => {
  let service: FaunaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaunaClient],
    }).compile();

    service = module.get<FaunaClient>(FaunaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
