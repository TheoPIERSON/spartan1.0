import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrestationEditModalComponent } from './prestation-edit-modal.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';
import { FormsModule } from '@angular/forms'; // Ajouter FormsModule

describe('PrestationEditModalComponent', () => {
  let component: PrestationEditModalComponent;
  let fixture: ComponentFixture<PrestationEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationEditModalComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule, // MatDialogModule pour le dialog
        FormsModule, // Ajout de FormsModule pour les formulaires
      ],
      providers: [
        TypePrestationService, // Fournir le service nécessaire
        { provide: MatDialogRef, useValue: {} }, // Mock pour MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock pour les données du dialog
      ],
    });

    fixture = TestBed.createComponent(PrestationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
