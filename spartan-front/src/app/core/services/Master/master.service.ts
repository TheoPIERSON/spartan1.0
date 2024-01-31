import { Injectable, signal } from '@angular/core';
import { Appointment } from 'src/app/Models/appointmentModel';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor() {}

  appointment = signal<Appointment[]>([]);

  AddAppointment(_appointment: Appointment) {
    this.appointment.mutate((previous) => previous.push(_appointment));
  }
}
