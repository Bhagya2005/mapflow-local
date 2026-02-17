import { Test, TestingModule } from '@nestjs/testing';
import { WalkthroughService } from './walkthrough.service';

describe('WalkthroughService', () => {
  let service: WalkthroughService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalkthroughService],
    }).compile();

    service = module.get<WalkthroughService>(WalkthroughService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
