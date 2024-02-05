import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Appointment } from '../Models/appointmentModel';
import { AppointmentService } from '../core/services/AppointmentService/appointment.service';
import { MasterService } from '../core/services/Master/master.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css'],
})
export class ProductaddComponent {
  constructor(
    private builder: FormBuilder,
    public appointmentService: MasterService
  ) {}

  appointmentForm = this.builder.group({
    appointmentStartDate: this.builder.control(new Date()),
    customer: this.builder.control(''),
  });

  startDate: Date =
    this.appointmentForm.value.appointmentStartDate ?? new Date();
  customerId: string = this.appointmentForm.value.customer ?? '';

  AddAppointment() {
    console.log(this.customerId);

    const appointmentObj: Appointment = {
      id: 0,
      appointmentStartDate: this.startDate, //this.appointmentForm.value.appointmentStartDate,
      appointmentEndDate: new Date('2024-01-30T14:30:00'),
      customer: {
        id: 0, //this.customerId,
        firstname: '',
        lastname: '',
        phoneNumber: '',
        mail: '',
        birthdate: '',
      },
    };
    console.log('nouvelle date' + this.startDate);

    this.appointmentService.AddAppointment(appointmentObj);
    console.log('La date de début est ' + appointmentObj.appointmentStartDate);
  }
}
