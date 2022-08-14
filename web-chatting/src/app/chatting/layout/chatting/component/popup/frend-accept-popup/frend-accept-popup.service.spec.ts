import { TestBed } from '@angular/core/testing';

import { FrendAcceptPopupService } from './frend-accept-popup.service';

describe('FrendAcceptPopupService', () => {
  let service: FrendAcceptPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrendAcceptPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
