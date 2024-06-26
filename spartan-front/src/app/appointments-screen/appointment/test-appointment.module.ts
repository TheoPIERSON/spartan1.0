// test.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentCalendarComponent } from '../appointment-calendar/appointment-calendar.component';

@NgModule({
  declarations: [AppointmentCalendarComponent],
  imports: [CommonModule],
})
export class TestAppointmentModule {}
