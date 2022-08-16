import { TestBed } from '@angular/core/testing';

import { InviteFrendsService } from './invite-frends.service';

describe('InviteFrendsService', () => {
  let service: InviteFrendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteFrendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
