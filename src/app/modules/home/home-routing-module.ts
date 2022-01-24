import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { RegisterOrganizationComponent } from './components/register-organization/register-organization.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'producten', component: ProductComponent },
  { path: 'producten/:id', component: ProductDetailComponent },
  { path: 'winkelmandje', component: ShoppingCartComponent},
  { path: 'organisaties', component: OrganizationComponent},
  { path: 'organisaties/:id', component: OrganizationDetailComponent},
  { path: 'inloggen', component: LoginComponent},
  { path: 'registreren', component: RegisterCustomerComponent},
  { path: 'registreren-organisaties', component: RegisterOrganizationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
