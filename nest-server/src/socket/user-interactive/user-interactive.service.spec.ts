import { Test, TestingModule } from '@nestjs/testing';
import { UserInteractiveService } from './user-interactive.service';

describe('UserInteractiveService', () => {
  let service: UserInteractiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInteractiveService],
    }).compile();

    service = module.get<UserInteractiveService>(UserInteractiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
