import { TestBed } from '@angular/core/testing';

import { FrendListService } from './frend-list.service';

describe('FrendListService', () => {
  let service: FrendListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrendListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
