import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customers } from '../../Models/customerModel';
import { CustomerService } from '../../core/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../../core/classes/customerClass';
import { CustomerIdService } from '../../core/services/customer-id.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public customers: Customers[] = [];
  id: any;
  data: any;
  selectedCustomer = new Customer({
    id: this.customerIdService.getSelectedCustomerId(),
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    birthdate: '',
  });

  constructor(
    private customerService: CustomerService,
    public matDialog: MatDialog,
    public customerIdService: CustomerIdService
  ) {}

  ngOnInit() {
    console.log('ID in modal:', this.customerIdService.getSelectedCustomerId());
    this.getCustomer();
  }

  public getCustomer() {
    this.customerService.findCustomerById(this.selectedCustomer.id).subscribe(
      (res: Customers) => {
        // Assurez-vous que les propriétés que vous souhaitez utiliser sont définies
        this.selectedCustomer.firstname = res.firstname;
        this.selectedCustomer.lastname = res.lastname;
        this.selectedCustomer.phoneNumber = res.phoneNumber;
        this.selectedCustomer.email = res.email;
        this.selectedCustomer.birthdate = res.birthdate;

        // Vous pouvez également mettre à jour d'autres propriétés si nécessaire
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public onUpdateCustomer() {
    this.customerService
      .updateCustomer(this.selectedCustomer)
      .subscribe((res) => {});
    window.location.reload();
  }
}
