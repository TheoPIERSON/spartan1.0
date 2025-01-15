import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prestations } from '../../Models/prestation_appointment';

@Injectable({
  providedIn: 'root',
})
export class PrestationAppointmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPrestations(): Observable<Prestations[]> {
    return this.http.get<Prestations[]>(`${this.apiServerUrl}/prestation/all`);
  }
  public findById(id: number): Observable<Prestations> {
    return this.http.get<Prestations>(`${this.apiServerUrl}/prestation/${id}`);
  }
  public addEvents(): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/oauth2/add-events`, {});
  }

  public assignPayment(id: number, payment: any): Observable<Prestations> {
    return this.http.put<Prestations>(
      `${this.apiServerUrl}/prestation/${id}/payment`,
      payment
    );
  }
}
