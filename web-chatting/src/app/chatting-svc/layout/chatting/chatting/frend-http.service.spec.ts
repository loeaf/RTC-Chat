import { TestBed } from '@angular/core/testing';

import { FrendHttpService } from '../invite-frends/frend-http.service';

describe('FrendHttpService', () => {
  let service: FrendHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrendHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
