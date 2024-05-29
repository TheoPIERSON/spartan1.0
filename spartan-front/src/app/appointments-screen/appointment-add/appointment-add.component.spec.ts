import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'; // Importer MatDialogModule

import { AppointmentAddComponent } from './appointment-add.component';
import { FormsModule } from '@angular/forms';

describe('AppointmentAddComponent', () => {
  let component: AppointmentAddComponent;
  let fixture: ComponentFixture<AppointmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentAddComponent],
      imports: [HttpClientModule, MatDialogModule, FormsModule], // Importer MatDialogModule dans le module de test
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
