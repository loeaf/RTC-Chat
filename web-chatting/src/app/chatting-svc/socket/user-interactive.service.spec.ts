import { TestBed } from '@angular/core/testing';

import { UserInteractiveService } from './user-interactive.service';

describe('UserInteractiveService', () => {
  let service: UserInteractiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInteractiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
