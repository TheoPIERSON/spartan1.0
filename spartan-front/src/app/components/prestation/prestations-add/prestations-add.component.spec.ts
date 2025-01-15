import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationsAddComponent } from './prestations-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('PrestationsAddComponent', () => {
  let component: PrestationsAddComponent;
  let fixture: ComponentFixture<PrestationsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        FormsModule, // Ajoutez FormsModule ici
        ReactiveFormsModule, // Ajout de ReactiveFormsModule pour les formulaires réactifs
      ],
      declarations: [PrestationsAddComponent],
    });
    fixture = TestBed.createComponent(PrestationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
