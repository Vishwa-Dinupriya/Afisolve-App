import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingComplaintsComponent } from './pending-complaints.component';

describe('PendingComplaintsComponent', () => {
  let component: PendingComplaintsComponent;
  let fixture: ComponentFixture<PendingComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
