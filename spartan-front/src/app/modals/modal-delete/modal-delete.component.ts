import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerIdService } from 'src/app/core/services/customer-id.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/core/classes/customerClass';
import { Customers } from 'src/app/Models/customerModel';
import { RefreshService } from 'src/app/core/services/refresh/refresh.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  public customers: Customers[] = [];

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
    public dialogRef: MatDialogRef<ModalDeleteComponent>, // Inject MatDialogRef
    public customerIdService: CustomerIdService,
    private refreshService: RefreshService,
    private toast: NgToastService
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
    this.customerService.deleteCustomer(this.selectedCustomer.id).subscribe(
      () => {
        // Fermez la modal une fois la suppression terminée
        this.dialogRef.close();
        // Émettez un événement de rafraîchissement
        this.refreshService.refreshComponent();
      },
      (error) => {
        this.toast.error({
          detail: 'ERREUR',
          summary:
            "Vous ne pouvez pas supprimer ce client, vérifiez qu'il ne soit pas associé à des rendez-vous.",
          duration: 6100,
        });

        console.error('Erreur lors de la suppression du client : ', error);
      }
    );
  }
  public onCloseButton() {
    this.dialogRef.close();
  }
}
