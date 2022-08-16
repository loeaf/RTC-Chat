import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutRoomPopupComponent } from './out-room-popup.component';

describe('OutRoomPopupComponent', () => {
  let component: OutRoomPopupComponent;
  let fixture: ComponentFixture<OutRoomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutRoomPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutRoomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
