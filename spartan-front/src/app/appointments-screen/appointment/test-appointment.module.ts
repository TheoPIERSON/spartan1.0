// test.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentAddComponent } from '../appointment-add/appointment-add.component';
import { AppointmentCalendarComponent } from '../appointment-calendar/appointment-calendar.component';

@NgModule({
  declarations: [AppointmentAddComponent, AppointmentCalendarComponent],
  imports: [CommonModule],
})
export class TestAppointmentModule {}
