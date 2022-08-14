import { TestBed } from '@angular/core/testing';

import { Live2dService } from './live2d.service';

describe('Live2dService', () => {
  let service: Live2dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Live2dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
