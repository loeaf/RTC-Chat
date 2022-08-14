import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaRoomUsersComponent } from './meta-room-users.component';

describe('MetaRoomUsersComponent', () => {
  let component: MetaRoomUsersComponent;
  let fixture: ComponentFixture<MetaRoomUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaRoomUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaRoomUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
