// customer-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importer ReactiveFormsModule ici

import { CustomerCardComponent } from './customer-card.component';

describe('CustomerCardComponent', () => {
  let component: CustomerCardComponent;
  let fixture: ComponentFixture<CustomerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCardComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
      ], // Ajouter ReactiveFormsModule
    });
    fixture = TestBed.createComponent(CustomerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
