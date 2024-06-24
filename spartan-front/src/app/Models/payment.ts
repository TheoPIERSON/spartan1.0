import { Appointment } from './appointmentModel';
import { TypePayment } from './typePaymentModel';

export interface Payment {
  id: number;
  amount: number;
  status: boolean;
  appointment: Appointment;
  typePayment: TypePayment;
}
