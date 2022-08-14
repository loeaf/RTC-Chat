import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFrendsComponent } from './invite-frends.component';

describe('InviteFrendsComponent', () => {
  let component: InviteFrendsComponent;
  let fixture: ComponentFixture<InviteFrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteFrendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteFrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
