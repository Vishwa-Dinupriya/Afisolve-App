import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCustomerComponent } from './test-customer.component';

describe('TestCustomerComponent', () => {
  let component: TestCustomerComponent;
  let fixture: ComponentFixture<TestCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
