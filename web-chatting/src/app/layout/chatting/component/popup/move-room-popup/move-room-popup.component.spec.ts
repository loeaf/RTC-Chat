import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRoomPopupComponent } from './move-room-popup.component';

describe('MoveRoomPopupComponent', () => {
  let component: MoveRoomPopupComponent;
  let fixture: ComponentFixture<MoveRoomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveRoomPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveRoomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
