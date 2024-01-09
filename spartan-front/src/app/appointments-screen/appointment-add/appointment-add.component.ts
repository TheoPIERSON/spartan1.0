import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { add } from 'date-fns';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Appointment } from 'src/app/Models/appointmentModel';
import { Customers } from 'src/app/Models/customerModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css'],
})
export class AppointmentAddComponent {
  customers$: Observable<Customers[]> = this.customerService.fetchCustomers();
  public id = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private appointmentService: AppointmentService
  ) {}

  public onAddAppointment(addForm: NgForm): void {
    console.log(this.id);

    // this.appointmentService.addAppointment(addForm.value).subscribe(
    //   (response: Appointment) => {
    //     console.log(response);
    //     addForm.reset();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //     addForm.reset();
    //   }
    // );
  }
}
