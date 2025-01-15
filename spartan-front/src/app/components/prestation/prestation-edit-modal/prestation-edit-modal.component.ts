import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Type_prestation } from 'src/app/core/classes/type_prestation_class';
import { TypePrestationIdService } from 'src/app/core/services/Type_prestation/type-prestation-id.service';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { TypePrestation } from 'src/app/Models/type_prestation';

@Component({
  selector: 'app-prestation-edit-modal',
  templateUrl: './prestation-edit-modal.component.html',
  styleUrls: ['./prestation-edit-modal.component.css'],
})
export class PrestationEditModalComponent implements OnInit {
  public customers: TypePrestation[] = [];
  id: number | undefined;

  selectedTypePrestation = new Type_prestation({
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

    console.log(this.selectedTypePrestation.id);
  }

  public getCustomer() {
    this.typePrestationService
      .findById(this.selectedTypePrestation.id)
      .subscribe(
        (res: TypePrestation) => {
          // Assurez-vous que les propriétés que vous souhaitez utiliser sont définies
          this.selectedTypePrestation.title = res.title;
          this.selectedTypePrestation.description = res.description;
          this.selectedTypePrestation.duration = res.duration;
          this.selectedTypePrestation.price = res.price;

          // Vous pouvez également mettre à jour d'autres propriétés si nécessaire
          console.log(this.selectedTypePrestation.title);
          console.log(this.selectedTypePrestation.price);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

  public onUpdateCustomer() {
    this.typePrestationService
      .updateTypePrestation(this.selectedTypePrestation)
      .subscribe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (res) => {
          // Fermez la modal une fois la suppression terminée
          // Émettez un événement de rafraîchissement
          this.refreshService.refreshComponent();
        },
        (error) => {
          this.toast.error({
            detail: 'ERREUR',
            summary:
              "Vous ne pouvez pas modifier ce client, vérifiez qu'il ne soit pas associé à des rendez-vous.",
            sticky: true,
          });

          console.error('Erreur lors de la mise à jour du client : ', error);
        }
      );
  }
}
