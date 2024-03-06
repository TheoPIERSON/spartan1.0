import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePayment } from 'src/app/Models/typePaymentModel';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypePaymentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchTypePayment(): Observable<TypePayment[]> {
    return this.http.get<TypePayment[]>(
      `${this.apiServerUrl}/type_payment/all`
    );
  }
  public addTypePayment(service: TypePayment): Observable<TypePayment> {
    return this.http.post<TypePayment>(
      `${this.apiServerUrl}/type_payment/add`,
      service
    );
  }
  public findById(id: number): Observable<TypePayment> {
    return this.http.get<TypePayment>(
      `${this.apiServerUrl}/type_payment/${id}`
    );
  }

  public updateTypePayment(typePayment: TypePayment): Observable<TypePayment> {
    const url = `${this.apiServerUrl}/type_payment/update/${typePayment.id}`;
    return this.http.put<TypePayment>(url, typePayment);
  }

  public deleteTypePayment(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/type_payment/delete/${id}`
    );
  }
}
