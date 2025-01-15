import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestationDeleteModalComponent } from './prestation-delete-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import pour les tests HTTP
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog'; // Si vous utilisez Angular Material
import { TypePrestationService } from 'src/app/core/services/Type_prestation/type-prestation.service';

describe('PrestationDeleteModalComponent', () => {
  let component: PrestationDeleteModalComponent;
  let fixture: ComponentFixture<PrestationDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestationDeleteModalComponent], // Déclarer le composant
      imports: [HttpClientTestingModule, MatDialogModule], // Ajouter les modules nécessaires
      providers: [
        TypePrestationService, // Fournir le service
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock des données du dialog
        { provide: MatDialogRef, useValue: {} }, // Mock de la référence du dialog
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrestationDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
