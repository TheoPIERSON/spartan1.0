import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/Models/appointmentModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
})
export class AppointmentCalendarComponent {
  appointment$: Observable<Appointment[]> =
    this.appointmentService.getAppointments();

  constructor(private appointmentService: AppointmentService) {}
}
