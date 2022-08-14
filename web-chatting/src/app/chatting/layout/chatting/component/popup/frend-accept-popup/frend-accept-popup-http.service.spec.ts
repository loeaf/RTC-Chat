import { TestBed } from '@angular/core/testing';

import { FrendAcceptPopupHttpService } from './frend-accept-popup-http.service';

describe('FrendAcceptPopupHttpService', () => {
  let service: FrendAcceptPopupHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrendAcceptPopupHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
