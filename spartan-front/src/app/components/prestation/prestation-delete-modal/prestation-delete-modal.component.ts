import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Type_prestation } from 'src/app/core/classes/type_prestation_class';
import { TypePrestationIdService } from 'src/app/core/services/Type_prestation/type-prestation-id.service';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { TypePrestation } from 'src/app/Models/type_prestation';

@Component({
  selector: 'app-prestation-delete-modal',
  templateUrl: './prestation-delete-modal.component.html',
  styleUrls: ['./prestation-delete-modal.component.css'],
})
export class PrestationDeleteModalComponent implements OnInit {
  public typePrestation: TypePrestation[] = [];
  id: number | undefined;

  selectedCustomer = new Type_prestation({
    id: this.typePrestationIdService.getSelectedTypePrestationId(),
    title: '',
    description: '',
    duration: 0,
    price: 0,
    type: '',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogRef: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshService: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any;

  constructor(
    private typePrestationService: TypePrestationService,
    public matDialog: MatDialog,
    public typePrestationIdService: TypePrestationIdService
  ) {}

  ngOnInit() {
    console.log(
      'ID in modal:',
      this.typePrestationIdService.getSelectedTypePrestationId()
    );
    this.getCustomer();
  }

  public getCustomer() {
    this.typePrestationService.findById(this.selectedCustomer.id).subscribe(
      (res: TypePrestation) => {
        // Assurez-vous que les propriétés que vous souhaitez utiliser sont définies
        this.selectedCustomer.title = res.title;
        this.selectedCustomer.description = res.description;
        this.selectedCustomer.duration = res.duration;
        this.selectedCustomer.price = res.price;

        console.log(this.selectedCustomer.title);

        // Vous pouvez également mettre à jour d'autres propriétés si nécessaire
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public onDeleteCustomer() {
    this.typePrestationService
      .deleteTypePrestation(this.selectedCustomer.id)
      .subscribe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (res) => {
          // Fermez la modal une fois la suppression terminée
          // Émettez un événement de rafraîchissement
          //this.refreshService.refreshComponent();
          window.location.reload();
        },
        (error) => {
          this.toast.error({
            detail: 'ERREUR',
            summary:
              "Vous ne pouvez pas supprimer ce client, vérifiez qu'il ne soit pas associé à des rendez-vous.",
            sticky: true,
          });

          console.error('Erreur lors de la suppression du client : ', error);
        }
      );
  }
}
