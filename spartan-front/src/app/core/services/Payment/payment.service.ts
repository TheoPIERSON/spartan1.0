import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/Models/payment';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiServerUrl}/payment/all`);
  }
}
