import { Test, TestingModule } from '@nestjs/testing';
import { MetaRoomService } from './meta-room.service';

describe('MetaRoomService', () => {
  let service: MetaRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaRoomService],
    }).compile();

    service = module.get<MetaRoomService>(MetaRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
