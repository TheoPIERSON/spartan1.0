import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule

import { AppointmentAddComponent } from './appointment-add.component';

describe('AppointmentAddComponent', () => {
  let component: AppointmentAddComponent;
  let fixture: ComponentFixture<AppointmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentAddComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule, // Ajoutez ReactiveFormsModule ici
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
