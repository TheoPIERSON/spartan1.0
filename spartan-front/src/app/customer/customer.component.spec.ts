import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
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
      imports: [HttpClientModule], // Importer MatDialogModule dans le module de test
    });
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
