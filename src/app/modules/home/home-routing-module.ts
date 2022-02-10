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
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { RetourFormComponent } from './components/retour-form/retour-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderOverviewCustomerComponent } from './components/order-overview-customer/order-overview-customer.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { OrderRetourComponent } from './components/order-retour/order-retour.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'producten', component: ProductComponent },
  { path: 'producten/:id', component: ProductDetailComponent },
  { path: 'winkelmandje', component: ShoppingCartComponent},
  { path: 'organisaties', component: OrganizationComponent},
  { path: 'organisaties/:id', component: OrganizationDetailComponent},
  { path: 'inloggen', component: LoginComponent},
  { path: 'registreren', component: RegisterCustomerComponent},
  { path: 'registreren/organisatie', component: RegisterOrganizationComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'retourneren', component: RetourFormComponent},
  { path: 'bestellen', component: OrderComponent},
  { path: 'besteld', component: OrderConfirmationComponent},
  { path: 'bestellingen', component: OrderOverviewCustomerComponent},
  { path: 'retour', component: OrderRetourComponent},
  //{ path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
