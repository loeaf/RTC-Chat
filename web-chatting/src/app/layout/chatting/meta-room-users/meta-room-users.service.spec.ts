import { TestBed } from '@angular/core/testing';

import { MetaRoomUsersService } from './meta-room-users.service';

describe('MetaRoomUsersService', () => {
  let service: MetaRoomUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaRoomUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
