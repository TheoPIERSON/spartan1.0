import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'; // Importez MatDialogModule
import { CustomerComponent } from './customer.component';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { CustomerCardComponent } from '../customer-card/customer-card.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerComponent,
        CustomerAddComponent,
        CustomerCardComponent,
      ],
      imports: [
        HttpClientModule,
        MatDialogModule, // Ajoutez MatDialogModule ici
      ],
    });
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
