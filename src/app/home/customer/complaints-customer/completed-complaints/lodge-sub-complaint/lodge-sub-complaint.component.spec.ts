import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgeSubComplaintComponent } from './lodge-sub-complaint.component';

describe('LodgeSubComplaintComponent', () => {
  let component: LodgeSubComplaintComponent;
  let fixture: ComponentFixture<LodgeSubComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LodgeSubComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgeSubComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
