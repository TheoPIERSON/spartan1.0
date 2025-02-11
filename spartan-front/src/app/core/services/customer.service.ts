import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../../Models/customerModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiServerUrl}/customer/all`);
  }
  public addCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customer/add`,
      customer
    );
  }

  public connectCustomer(username: string, password: string): Observable<void> {
    const credentials = { username, password };
    return this.http.post<void>(
      `${this.apiServerUrl}/customer/connexion`,
      credentials,
      {
        withCredentials: true,
      }
    );
  }

  public disconnectCustomer(): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/customer/disconnect`,
      null
    );
  }
  // public updateCustomer(customer: Customers): Observable<Customers> {
  //   return this.http.put<Customers>(
  //     `${this.apiServerUrl}/customers/update`,
  //     customer
  //   );
  // }

  public findCustomerById(id: number): Observable<Customers> {
    return this.http.get<Customers>(`${this.apiServerUrl}/customer/${id}`);
  }

  public updateCustomer(customer: Customers): Observable<Customers> {
    const url = `${this.apiServerUrl}/customer/update/${customer.id}`;
    return this.http.put<Customers>(url, customer);
  }

  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${id}`);
  }
  public activateAccount(code: string): Observable<Customers> {
    const activation = { code: code };
    console.log(activation);
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customer/activate`,
      activation
    );
  }
  public askNewPassword(email: string): Observable<string> {
    return this.http.post<string>(
      `${this.apiServerUrl}/customer/forgot-password`,
      { email }
    );
  }
  public updatePassword(token: string, password: string): Observable<any> {
    const payload = { token, password };
    return this.http.post<any>(
      `${this.apiServerUrl}/customer/reset-password`,
      payload,
      { responseType: 'text' as 'json' } // <-- indique que la réponse est du texte
    );
  }
}
