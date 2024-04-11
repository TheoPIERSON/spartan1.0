import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TypePaymentService } from './type-payment.service';

describe('TypePaymentService', () => {
  let service: TypePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TypePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
