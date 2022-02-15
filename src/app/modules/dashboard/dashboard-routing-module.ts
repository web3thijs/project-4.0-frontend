import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { OrganizationAccountComponent } from './components/organization-account/organization-account.component';
import { OrganizationDonationComponent } from './components/organization-donation/organization-donation.component';
import { OrganizationOrderComponent } from './components/organization-order/organization-order.component';
import { OrganizationPagenotfoundComponent } from './components/organization-pagenotfound/organization-pagenotfound.component';
import { OrganizationProductFormComponent } from './components/organization-product-form/organization-product-form.component';
import { OrganizationProductComponent } from './components/organization-product/organization-product.component';
import { OrganizationStockFormComponent } from './components/organization-stock-form/organization-stock-form.component';
import { OrganizationComponent } from './components/organization/organization.component';

const routes: Routes = [
  { path: '', component: OrganizationComponent },
  { path: 'producten', component: OrganizationProductComponent },
  { path: 'producten/form', component: OrganizationProductFormComponent },
  { path: 'bestellingen', component: OrganizationOrderComponent},
  { path: 'vrije-giften', component: OrganizationDonationComponent},
  { path: 'stocks/form', component: OrganizationStockFormComponent},
  { path: 'account', component: OrganizationAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
