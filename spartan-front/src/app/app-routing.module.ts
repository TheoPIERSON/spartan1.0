import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AppointmentComponent } from './pages/appointments-screen/appointment/appointment.component';
import { FakeloginComponent } from './pages/fakelogin/fakelogin.component';
import { AccountingComponent } from './pages/accounting-screen/accounting/accounting.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: '', component: FakeloginComponent, data: { displaySidebar: false } },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
