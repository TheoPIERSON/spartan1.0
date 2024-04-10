import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './core/services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgToastModule } from 'ng-angular-popup';

import { ModalComponent } from './modals/modal/modal.component';
import { CustomerIdService } from './core/services/customer-id.service';
import { AppointmentComponent } from './appointments-screen/appointment/appointment.component';
import { AppointmentAddComponent } from './appointments-screen/appointment-add/appointment-add.component';
import { RouterLink, provideRouter } from '@angular/router';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointmentCalendarComponent } from './appointments-screen/appointment-calendar/appointment-calendar.component';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { FakeloginComponent } from './fakelogin/fakelogin.component';
import { AppointmentModalComponent } from './appointments-screen/appointment-modal/appointment-modal.component';
import { AccountingComponent } from './accounting-screen/accounting/accounting.component';
import { AccountingBalanceComponent } from './accounting-screen/accounting-balance/accounting-balance.component';

registerLocaleData(localeFr, 'fr');

class CustomeDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerCardComponent,
    SidebarComponent,
    CustomerAddComponent,
    ModalComponent,
    AppointmentComponent,
    AppointmentAddComponent,
    AppointmentCalendarComponent,
    FakeloginComponent,
    AppointmentModalComponent,
    AccountingComponent,
    AccountingBalanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,

    RouterLink,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule,
    NgToastModule,
  ],

  providers: [
    CustomerService,
    CustomerIdService,
    provideRouter(routes),
    [{ provide: CalendarDateFormatter, useClass: CustomeDateFormatter }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
