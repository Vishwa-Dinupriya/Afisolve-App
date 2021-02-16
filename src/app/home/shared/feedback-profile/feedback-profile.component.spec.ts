import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackProfileComponent } from './feedback-profile.component';

describe('FeedbackProfileComponent', () => {
  let component: FeedbackProfileComponent;
  let fixture: ComponentFixture<FeedbackProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
