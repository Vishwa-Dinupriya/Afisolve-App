import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtasksComponent } from './devtasks.component';

describe('DevtasksComponent', () => {
  let component: DevtasksComponent;
  let fixture: ComponentFixture<DevtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevtasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
