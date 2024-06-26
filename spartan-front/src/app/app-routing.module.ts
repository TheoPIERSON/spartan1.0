import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer-screen/customer/customer.component';
import { AppointmentComponent } from './pages/appointments-screen/appointment/appointment.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountingComponent } from './pages/accounting-screen/accounting/accounting.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: '', component: LoginComponent, data: { displaySidebar: false } },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
