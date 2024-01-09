import { Appointment } from 'src/app/Models/appointmentModel';
import { Customers } from 'src/app/Models/customerModel';

export class AppointmentClass implements Appointment {
  id: number;
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  customer: Customers;

  constructor(appointmentData: Appointment) {
    this.id = appointmentData.id;
    this.appointmentStartDate = appointmentData.appointmentStartDate;
    this.appointmentEndDate = appointmentData.appointmentEndDate;
    this.customer = appointmentData.customer;
  }
}
