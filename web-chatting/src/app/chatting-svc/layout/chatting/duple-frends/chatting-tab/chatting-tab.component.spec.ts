import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingTabComponent } from './chatting-tab.component';

describe('ChattingTabComponent', () => {
  let component: ChattingTabComponent;
  let fixture: ComponentFixture<ChattingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChattingTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChattingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
