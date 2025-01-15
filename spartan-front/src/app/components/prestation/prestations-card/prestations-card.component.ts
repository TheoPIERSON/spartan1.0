import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { RefreshService } from 'src/app/core/services/Refresh/refresh.service';
import { TypePrestationIdService } from 'src/app/core/services/Type_prestation/type-prestation-id.service';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { PrestationEditModalComponent } from '../prestation-edit-modal/prestation-edit-modal.component';
import { PrestationDeleteModalComponent } from '../prestation-delete-modal/prestation-delete-modal.component';
import { TypePrestation } from 'src/app/Models/type_prestation';
import { Type_prestation } from 'src/app/core/classes/type_prestation_class';

@Component({
  selector: 'app-prestations-card',
  templateUrl: './prestations-card.component.html',
  styleUrls: ['./prestations-card.component.css'],
})
export class PrestationsCardComponent implements OnInit, OnDestroy {
  public typePrestation: TypePrestation[] = [];

  search = this.fb.nonNullable.group({
    title: [''],
  });

  selectedTypePrestation = new Type_prestation({
    id: 0, // ou l'ID par défaut que vous préférez
    title: '',
    description: '',
    duration: 0,
    price: 0,
    type: '',
  });

  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshSubscription: any;

  constructor(
    private typePrestationService: TypePrestationService,
    private typePrestationIdService: TypePrestationIdService,
    public matDialog: MatDialog,
    private fb: FormBuilder,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    // Abonnez-vous aux événements de rafraîchissement
    this.refreshSubscription = this.refreshService
      .getRefreshObservable()
      .subscribe(() => {
        // Mettez ici le code que vous souhaitez exécuter lors du rafraîchissement du composant
        this.typePrestation$ = this.getTypePrestation(); // Réinitialisez les données du composant
      });
  }

  ngOnDestroy(): void {
    // N'oubliez pas de vous désabonner pour éviter les fuites de mémoire
    this.refreshSubscription.unsubscribe();
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'prestation-edit-modal-component';
    // https://material.angular.io/components/dialog/overview
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const modalDialog = this.matDialog.open(
      PrestationEditModalComponent,
      dialogConfig
    );
  }

  openModalDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'prestation-delete-modal-component';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const modalDialog = this.matDialog.open(
      PrestationDeleteModalComponent,
      dialogConfig
    );
  }

  onCardClick(id: number): void {
    this.typePrestationService.findById(id).subscribe(
      (res: TypePrestation) => {
        this.selectedTypePrestation = res;
        this.typePrestationIdService.setSelectedTypePrestationId(id);
        this.openModal(); // Ouvrez la modale avec les informations du client
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
  onDeleteCardClick(id: number): void {
    this.typePrestationService.findById(id).subscribe(
      (res: TypePrestation) => {
        this.selectedTypePrestation = res;
        this.typePrestationIdService.setSelectedTypePrestationId(id);
        this.openModalDelete(); // Ouvrez la modale avec les informations du client
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  private getTypePrestation(): Observable<TypePrestation[]> {
    const type_prestation$ = this.typePrestationService.fetchTypePrestation();

    const search$ = combineLatest([
      this.search.controls.title.valueChanges.pipe(startWith('')),
    ]);
    return combineLatest([type_prestation$, search$]).pipe(
      map(([type_prestation, [title]]) =>
        type_prestation.filter((type_prestation) => {
          const isTitleMatching = type_prestation.title
            .toLowerCase()
            .includes(title.toLowerCase());
          return isTitleMatching;
        })
      )
    );
  }
}
