import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/app/Models/appointmentModel';
import { Customers } from 'src/app/Models/customerModel';
import { Customer } from 'src/app/core/classes/customerClass';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { RefreshService } from 'src/app/core/services/refresh/refresh.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css'],
})
export class AppointmentAddComponent {
  // Recupère le form group du html
  search = this.fb.nonNullable.group({
    firstname: [''],
    lastname: [''],
    startDate: new Date(),
    endDate: new Date(),
  });
  // Créer un nouvel object Customer
  selectedCustomer = new Customer({
    id: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    birthdate: '',
  });
  // Récupère tout les customers de la base de données pour les utiliser
  customers$: Observable<Customers[]> = this.getCustomers();

  constructor(
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    public matDialog: MatDialog,
    private fb: FormBuilder,
    private refreshService: RefreshService,
    private toast: NgToastService
  ) {}

  // Permet de chercher les customers avec la barre de recherche
  private getCustomers(): Observable<Customer[]> {
    const customers$ = this.customerService.fetchCustomers();

    const search$ = combineLatest([this.search.controls.lastname.valueChanges]);
    return combineLatest([customers$, search$]).pipe(
      map(([customers, [lastname]]) =>
        customers.filter((customer) => {
          const isLastnameMatching = customer.lastname
            .toLowerCase()
            .includes(lastname.toLowerCase());

          return isLastnameMatching;
        })
      )
    );
  }
  // Selectionne le customer dans le formulaire
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.search.patchValue({
      lastname: customer.lastname,
    });
    console.log(customer.lastname);
  }

  //Ajoute le nouvel appointment dans la base de données
  public onAddAppointment(): void {
    // Récupérer la date sélectionnée dans le formulaire
    const selectedStartDate: Date = this.search.value.startDate ?? new Date();
    const selectedEndDate: Date = this.search.value.endDate ?? new Date();
    // Reste du code...
    const appointmentObj: Appointment = {
      id: 0,
      appointmentStartDate: selectedStartDate,
      appointmentEndDate: selectedEndDate,
      customer: {
        id: this.selectedCustomer.id,
        firstname: this.selectedCustomer.firstname,
        lastname: this.selectedCustomer.lastname,
        phoneNumber: this.selectedCustomer.phoneNumber,
        email: this.selectedCustomer.email,
        birthdate: this.selectedCustomer.birthdate,
      },
    };
    this.toast.success({
      detail: 'SUCCÈS !',
      summary: 'Le client à bien été ajouter à la base de données.',
      duration: 2100,
    });
    this.appointmentService.addAppointment(appointmentObj).subscribe();
    this.refreshService.refreshComponent();
  }
}
