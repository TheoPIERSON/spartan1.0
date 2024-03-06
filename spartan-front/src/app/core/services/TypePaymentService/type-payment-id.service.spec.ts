import { TestBed } from '@angular/core/testing';

import { TypePaymentIdService } from './type-payment-id.service';

describe('TypePaymentIdService', () => {
  let service: TypePaymentIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePaymentIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
