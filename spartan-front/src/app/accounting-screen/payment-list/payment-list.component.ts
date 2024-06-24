import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/Models/payment';
import { PaymentService } from 'src/app/core/services/Payment/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  payment$: Observable<Payment[]> = this.paymnentsService.fetchPayment();

  constructor(private paymnentsService: PaymentService) {}
  ngOnInit(): void {
    console.log(this.payment$);
  }
}
