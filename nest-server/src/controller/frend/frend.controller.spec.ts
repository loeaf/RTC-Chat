import { Test, TestingModule } from '@nestjs/testing';
import { FrendsController } from './frendsController';
import { FrendService } from './frend.service';

describe('FrendController', () => {
  let controller: FrendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrendsController],
      providers: [FrendService],
    }).compile();

    controller = module.get<FrendsController>(FrendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
