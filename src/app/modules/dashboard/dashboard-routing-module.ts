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
  { path: 'organisatie', component: OrganizationComponent },
  { path: 'organisatie/product', component: OrganizationProductComponent },
  { path: 'organisatie/product/form', component: OrganizationProductFormComponent },
  { path: 'organisatie/bestelling', component: OrganizationOrderComponent},
  { path: 'organisatie/vrije-gift', component: OrganizationDonationComponent},
  { path: 'organisatie/stock/form', component: OrganizationStockFormComponent},
  { path: 'organisatie/account', component: OrganizationAccountComponent},
  //{ path: '**', component: OrganizationPagenotfoundComponent},
];

/*{
    path: 'page-not-found',
    component: PagenotfoundComponent
},
{
    path: '**',
    redirectTo: '/page-not-found'
},*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
