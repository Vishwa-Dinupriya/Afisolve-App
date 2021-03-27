import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedComplaintsComponent } from './completed-complaints.component';

describe('CompletedComplaintsComponent', () => {
  let component: CompletedComplaintsComponent;
  let fixture: ComponentFixture<CompletedComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
