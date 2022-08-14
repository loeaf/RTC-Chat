import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrendListComponent } from './frend-list.component';

describe('FrendListComponent', () => {
  let component: FrendListComponent;
  let fixture: ComponentFixture<FrendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrendListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
