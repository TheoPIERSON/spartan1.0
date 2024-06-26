import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { MatDialogModule } from '@angular/material/dialog'; // Importer MatDialogModule

import { ModalComponent } from './modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [HttpClientModule, MatDialogModule, FormsModule], // Importer MatDialogModule dans le module de test
      providers: [MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
