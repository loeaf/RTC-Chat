import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteChattingComponent } from './invite-chatting.component';

describe('InviteChattingComponent', () => {
  let component: InviteChattingComponent;
  let fixture: ComponentFixture<InviteChattingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteChattingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteChattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
