import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingComponent } from './accounting.component';
import { AccountingBalanceComponent } from '../accounting-balance/accounting-balance.component';
import { PaymentListComponent } from '../payment-list/payment-list.component';

describe('AccountingComponent', () => {
  let component: AccountingComponent;
  let fixture: ComponentFixture<AccountingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountingComponent,
        AccountingBalanceComponent,
        PaymentListComponent,
      ],
    });
    fixture = TestBed.createComponent(AccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
