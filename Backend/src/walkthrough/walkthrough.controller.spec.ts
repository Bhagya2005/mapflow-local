import { Test, TestingModule } from '@nestjs/testing';
import { WalkthroughController } from './walkthrough.controller';

describe('WalkthroughController', () => {
  let controller: WalkthroughController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalkthroughController],
    }).compile();

    controller = module.get<WalkthroughController>(WalkthroughController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
