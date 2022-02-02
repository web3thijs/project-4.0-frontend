import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardCustomerComponent } from './components/dashboard-customer/dashboard-customer.component';
import { DashboardOrganizationComponent } from './components/dashboard-organization/dashboard-organization.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard-admin', component: DashboardComponent },
  { path: 'dashboard-admin/organisaties', component: DashboardOrganizationComponent},
  { path: 'dashboard-admin/gebruikers', component: DashboardCustomerComponent},
  { path: 'dashboard-admin/producten', component: DashboardProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
