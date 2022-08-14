import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrendAcceptPopupComponent } from './frend-accept-popup.component';

describe('FrendAcceptPopupComponent', () => {
  let component: FrendAcceptPopupComponent;
  let fixture: ComponentFixture<FrendAcceptPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrendAcceptPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrendAcceptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
