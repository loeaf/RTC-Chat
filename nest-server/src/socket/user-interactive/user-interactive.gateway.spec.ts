import { Test, TestingModule } from '@nestjs/testing';
import { UserInteractiveGateway } from './user-interactive.gateway';
import { UserInteractiveService } from './user-interactive.service';

describe('UserInteractiveGateway', () => {
  let gateway: UserInteractiveGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInteractiveGateway, UserInteractiveService],
    }).compile();

    gateway = module.get<UserInteractiveGateway>(UserInteractiveGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
