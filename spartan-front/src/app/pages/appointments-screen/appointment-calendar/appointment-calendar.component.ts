import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/Models/appointmentModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { RefreshService } from 'src/app/core/services/refresh/refresh.service';
import { AppointmentIdService } from 'src/app/core/services/AppointmentService/appointment-id.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
})
export class AppointmentCalendarComponent implements OnInit {
  appointment$: Observable<Appointment[]> =
    this.appointmentService.getAppointments();

  refreshSubscription: any;

  constructor(
    private appointmentService: AppointmentService,
    private appointmentIdService: AppointmentIdService,
    public matDialog: MatDialog,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    // Abonnez-vous aux événements de rafraîchissement
    this.refreshSubscription = this.refreshService
      .getRefreshObservable()
      .subscribe(() => {
        // Mettez ici le code que vous souhaitez exécuter lors du rafraîchissement du composant
        this.appointment$ = this.appointmentService.getAppointments(); // Réinitialisez les données du composant
      });
  }

  onCardClick(id: number): void {
    this.appointmentService.findById(id).subscribe(
      (res: Appointment) => {
        this.appointmentIdService.setSelectedAppointmentId(id);
        this.openModal(); // Ouvrez la modale avec les informations du client
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(
      AppointmentModalComponent,
      dialogConfig
    );
  }
}
