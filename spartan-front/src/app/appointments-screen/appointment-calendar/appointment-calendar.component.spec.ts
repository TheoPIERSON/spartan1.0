import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Importez NoopAnimationsModule ou BrowserAnimationsModule si nécessaire

import { AppointmentCalendarComponent } from './appointment-calendar.component';

describe('AppointmentCalendarComponent', () => {
  let component: AppointmentCalendarComponent;
  let fixture: ComponentFixture<AppointmentCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentCalendarComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        NoopAnimationsModule, // Assurez-vous d'importer NoopAnimationsModule ou BrowserAnimationsModule ici
      ],
      providers: [MatDialog], // Fournir MatDialog comme un fournisseur
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
