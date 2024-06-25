import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppointmentAddComponent } from './appointment-add.component';

@NgModule({
  declarations: [AppointmentAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  exports: [AppointmentAddComponent],
})
export class TestAppointmentAddModule {}
