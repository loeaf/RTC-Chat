import { TestBed } from '@angular/core/testing';

import { MetaRoomUsersHttpService } from './meta-room-users-http.service';

describe('MetaRoomUsersHttpService', () => {
  let service: MetaRoomUsersHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaRoomUsersHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
