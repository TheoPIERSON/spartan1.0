import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { PrestationComponent } from './pages/prestation/prestation.component';
import { RegisterComponent } from './pages/register/register.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { PasswordForgottenComponent } from './pages/password-forgotten/password-forgotten.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: '', component: LoginComponent, data: { displaySidebar: false } },
  { path: 'prestation', component: PrestationComponent },
  {
    path: 'register',
    component: RegisterComponent,
    data: { displaySidebar: false },
  },
  {
    path: 'activation',
    component: ValidationComponent,
    data: { displaySidebar: false },
  },
  {
    path: 'password-forgotten',
    component: PasswordForgottenComponent,
    data: { displaySidebar: false },
  },
  {
    path: 'password-reset/:token',
    component: ChangePasswordComponent,
    data: { displaySidebar: false },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
