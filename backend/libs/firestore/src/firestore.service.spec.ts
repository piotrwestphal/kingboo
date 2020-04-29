import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreClient } from './firestore.client';

describe('FirestoreService', () => {
  let service: FirestoreClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirestoreClient],
    }).compile();

    service = module.get<FirestoreClient>(FirestoreClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
