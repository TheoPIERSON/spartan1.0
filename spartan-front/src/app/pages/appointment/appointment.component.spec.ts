import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentComponent } from './appointment.component';
import { TestAppointmentAddModule } from '../../components/appointment/appointment-add/test-appointment-add.module';
import { AppointmentCalendarComponent } from 'src/app/components/appointment/appointment-calendar/appointment-calendar.component';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentComponent, AppointmentCalendarComponent],
      imports: [TestAppointmentAddModule],
    });
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
