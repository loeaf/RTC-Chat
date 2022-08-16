import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkSendBoxComponent } from './talk-send-box.component';

describe('TalkSendBoxComponent', () => {
  let component: TalkSendBoxComponent;
  let fixture: ComponentFixture<TalkSendBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkSendBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkSendBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
