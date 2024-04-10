import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBalanceComponent } from './accounting-balance.component';

describe('AccountingBalanceComponent', () => {
  let component: AccountingBalanceComponent;
  let fixture: ComponentFixture<AccountingBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingBalanceComponent]
    });
    fixture = TestBed.createComponent(AccountingBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
