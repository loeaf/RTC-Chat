import { Test, TestingModule } from '@nestjs/testing';
import { MetaRoomController } from './meta-room.controller';
import { MetaRoomService } from './meta-room.service';

describe('MetaRoomController', () => {
  let controller: MetaRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaRoomController],
      providers: [MetaRoomService],
    }).compile();

    controller = module.get<MetaRoomController>(MetaRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
