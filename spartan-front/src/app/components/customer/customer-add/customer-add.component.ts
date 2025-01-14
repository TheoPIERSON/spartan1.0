import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customers } from '../../../Models/customerModel';
import { CustomerService } from '../../../core/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { RefreshService } from '../../../core/services/refresh/refresh.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent {
  public customers: Customers[] = [];

  constructor(
    private customerService: CustomerService,
    private toast: NgToastService,
    private refreshService: RefreshService
  ) {}

  public onAddCustomer(addForm: NgForm): void {
    document.getElementById('add-customer-btn');
    console.log('Form Data:', addForm.value);

    this.customerService.addCustomer(addForm.value).subscribe(
      (response: Customers) => {
        console.log(response);
        addForm.reset();
        this.toast.success({
          detail: 'SUCCÈS !',
          summary: 'Le client à bien été ajouter à la base de données.',
          duration: 2100,
        });
        this.refreshService.refreshComponent();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
