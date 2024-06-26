import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ModalDeleteComponent } from './modal-delete.component';

describe('ModalDeleteComponent', () => {
  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteComponent],
      imports: [HttpClientModule, MatDialogModule, FormsModule],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: {} }, // Fournir une version mockée de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Fournir une version mockée de MAT_DIALOG_DATA si nécessaire
      ],
    });
    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
