import { TestBed } from '@angular/core/testing';

import { ChattingTabService } from './chatting-tab.service';

describe('ChattingTabService', () => {
  let service: ChattingTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChattingTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
