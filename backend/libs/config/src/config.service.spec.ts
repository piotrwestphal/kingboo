import { Test, TestingModule } from '@nestjs/testing';
import { CommonConfigService } from './common-config.service';

describe('ConfigService', () => {
  let service: CommonConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonConfigService],
    }).compile();

    service = module.get<CommonConfigService>(CommonConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
