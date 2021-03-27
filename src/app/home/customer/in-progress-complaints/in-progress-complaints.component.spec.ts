import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressComplaintsComponent } from './in-progress-complaints.component';

describe('InProgressComplaintsComponent', () => {
  let component: InProgressComplaintsComponent;
  let fixture: ComponentFixture<InProgressComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
