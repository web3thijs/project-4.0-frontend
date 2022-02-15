import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardCategoryFormComponent } from './components/dashboard-category-form/dashboard-category-form.component';
import { DashboardCategoryComponent } from './components/dashboard-category/dashboard-category.component';
import { DashboardCustomerComponent } from './components/dashboard-customer/dashboard-customer.component';
import { DashboardOrganizationComponent } from './components/dashboard-organization/dashboard-organization.component';
import { DashboardPagenotfoundComponent } from './components/dashboard-pagenotfound/dashboard-pagenotfound.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'organisaties', component: DashboardOrganizationComponent},
  { path: 'klanten', component: DashboardCustomerComponent},
  { path: 'producten', component: DashboardProductComponent},
  { path: 'categorieën', component: DashboardCategoryComponent},
  { path: 'categorieën/form', component: DashboardCategoryFormComponent},
  //{ path: '**', component: DashboardPagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
