import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentAddComponent } from './appointment-add.component';
import { TestAppointmentAddModule } from './test-appointment-add.module'; // Importez votre module de test

describe('AppointmentAddComponent', () => {
  let component: AppointmentAddComponent;
  let fixture: ComponentFixture<AppointmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        TestAppointmentAddModule, // Utilisez votre module de test ici
      ],
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
