import { TestBed } from '@angular/core/testing';

import { ChannelManagerService } from './channel/channel-manager.service';

describe('ChannelManagerService', () => {
  let service: ChannelManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
