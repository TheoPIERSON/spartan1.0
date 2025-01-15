import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import du ReactiveFormsModule
import { PrestationsCardComponent } from './prestations-card.component';
import { MatDialog } from '@angular/material/dialog';

describe('PrestationsCardComponent', () => {
  let component: PrestationsCardComponent;
  let fixture: ComponentFixture<PrestationsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationsCardComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule, // Ajout du ReactiveFormsModule ici
      ],
      providers: [
        { provide: MatDialog, useValue: {} }, // Mock MatDialog
      ],
    });
    fixture = TestBed.createComponent(PrestationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
