import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CustomerAddComponent } from './customer-add.component';
import { FormsModule } from '@angular/forms';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddComponent],
      imports: [HttpClientModule, FormsModule],
    });
    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
