import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerService } from './core/services/customer.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgToastModule } from 'ng-angular-popup';

import { ModalComponent } from './components/modals/modal/modal.component';
import { CustomerIdService } from './core/services/customer-id.service';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { AppointmentAddComponent } from './components/appointment/appointment-add/appointment-add.component';
import { RouterLink, provideRouter } from '@angular/router';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AppointmentModalComponent } from './components/appointment/appointment-modal/appointment-modal.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { AccountingBalanceComponent } from './components/accounting/accounting-balance/accounting-balance.component';
import { PaymentListComponent } from './components/accounting/payment-list/payment-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptorService } from './core/interceptor/auth-interceptor.service';
import { AppointmentCalendarComponent } from './components/appointment/appointment-calendar/appointment-calendar.component';
import { CustomerCardComponent } from './components/customer/customer-card/customer-card.component';
import { PrestationComponent } from './pages/prestation/prestation.component';
import { PrestationsAddComponent } from './components/prestation/prestations-add/prestations-add.component';
import { PrestationsCardComponent } from './components/prestation/prestations-card/prestations-card.component';
import { PrestationEditModalComponent } from './components/prestation/prestation-edit-modal/prestation-edit-modal.component';
import { RegisterComponent } from './pages/register/register.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { ActivationFormComponent } from './components/activation-form/activation-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PasswordForgottenComponent } from './pages/password-forgotten/password-forgotten.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

registerLocaleData(localeFr, 'fr');

@Injectable()
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
    AppointmentModalComponent,
    AccountingComponent,
    AccountingBalanceComponent,
    PaymentListComponent,
    LoginComponent,
    PrestationComponent,
    PrestationsAddComponent,
    PrestationsCardComponent,
    PrestationEditModalComponent,
    RegisterComponent,
    ValidationComponent,
    ActivationFormComponent,
    RegisterFormComponent,
    PasswordForgottenComponent,
    ChangePasswordComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideRouter(routes),
    [{ provide: CalendarDateFormatter, useClass: CustomeDateFormatter }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
