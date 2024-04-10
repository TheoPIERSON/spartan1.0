import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/Models/appointmentModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { RefreshService } from 'src/app/core/services/refresh/refresh.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
})
export class AppointmentCalendarComponent {
  appointment$: Observable<Appointment[]> =
    this.appointmentService.getAppointments();

  refreshSubscription: any;

  constructor(
    private appointmentService: AppointmentService,
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
