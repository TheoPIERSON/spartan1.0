import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/Models/appointmentModel';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointment/all`);
  }
  public addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(
      `${this.apiServerUrl}/appointment/add`,
      appointment
    );
  }
}
