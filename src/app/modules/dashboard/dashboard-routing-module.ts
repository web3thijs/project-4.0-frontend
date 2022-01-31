import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { OrganizationAccountComponent } from './components/organization-account/organization-account.component';
import { OrganizationDonationComponent } from './components/organization-donation/organization-donation.component';
import { OrganizationOrderComponent } from './components/organization-order/organization-order.component';
import { OrganizationProductFormComponent } from './components/organization-product-form/organization-product-form.component';
import { OrganizationProductComponent } from './components/organization-product/organization-product.component';
import { OrganizationComponent } from './components/organization/organization.component';

const routes: Routes = [
  { path: 'organisatie/product', component: OrganizationProductComponent },
  { path: 'organisatie/product/form', component: OrganizationProductFormComponent },
  { path: 'organisatie', component: OrganizationComponent },
  { path: 'organisatie/bestelling', component: OrganizationOrderComponent},
  { path: 'organisatie/vrije-gift', component: OrganizationDonationComponent},
  { path: 'organisatie/account', component: OrganizationAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
