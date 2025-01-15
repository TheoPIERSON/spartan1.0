import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { PrestationComponent } from './pages/prestation/prestation.component';
import { RegisterComponent } from './pages/register/register.component';

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
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
