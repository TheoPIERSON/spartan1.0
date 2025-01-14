import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentClass } from 'src/app/core/classes/appointmentClass';
import { AppointmentIdService } from 'src/app/core/services/AppointmentService/appointment-id.service';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { Appointment } from 'src/app/Models/appointmentModel';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css'],
})
export class AppointmentModalComponent {
  public appointment: Appointment[] = [];

  paymentForm = this.fb.nonNullable.group({
    amountCard: 0,
    typePayment: 0,
  });

  constructor(
    public matDialog: MatDialog,
    private fb: FormBuilder,
    public appointmentService: AppointmentService,
    public appointmentIdService: AppointmentIdService
  ) {}

  ngOnInit() {
    console.log(
      'ID in modal:',
      this.appointmentIdService.getSelectedAppointmentId()
    );
    this.getAppointment();
  }

  public getAppointment() {
    const appointmentId = this.appointmentIdService.getSelectedAppointmentId();
    this.appointmentService.findById(appointmentId).subscribe(
      (res: Appointment) => {
        // Log pour vérifier que les données sont correctement récupérées
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
  addPayment() {
    this.getAppointment(); // Assurez-vous que getAppointment est bien asynchrone si nécessaire
    const appointmentID = this.appointmentIdService.getSelectedAppointmentId();
  }
}
