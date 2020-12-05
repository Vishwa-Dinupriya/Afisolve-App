import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCoordinatorComponent } from './account-coordinator.component';

describe('AccountCoordinatorComponent', () => {
  let component: AccountCoordinatorComponent;
  let fixture: ComponentFixture<AccountCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCoordinatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
