import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedComplaintsComponent } from './closed-complaints.component';

describe('ClosedComplaintsComponent', () => {
  let component: ClosedComplaintsComponent;
  let fixture: ComponentFixture<ClosedComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
