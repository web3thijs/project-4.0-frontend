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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderRetourComponent } from './components/order-retour/order-retour.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { CustomerAuthGuard } from 'src/app/core/guards/customer-auth.guard';

const routes: Routes = [
  { path: '', pathMatch:'full', component: HomepageComponent},
  { path: 'producten', component: ProductComponent },
  { path: 'producten/:id', component: ProductDetailComponent },
  { path: 'winkelmandje', component: ShoppingCartComponent, canActivate: [CustomerAuthGuard], canActivateChild: [CustomerAuthGuard]},
  { path: 'organisaties', component: OrganizationComponent},
  { path: 'organisaties/:id', component: OrganizationDetailComponent},
  { path: 'inloggen', component: LoginComponent},
  { path: 'registreren', component: RegisterCustomerComponent},
  { path: 'registreren/organisatie', component: RegisterOrganizationComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'bestellen', component: OrderComponent, canActivate: [CustomerAuthGuard], canActivateChild: [CustomerAuthGuard]},
  { path: 'besteld', component: OrderConfirmationComponent, canActivate: [CustomerAuthGuard], canActivateChild: [CustomerAuthGuard]},
  { path: 'bestellingen', component: OrderHistoryComponent, canActivate: [CustomerAuthGuard], canActivateChild: [CustomerAuthGuard]},
  { path: 'retour', component: OrderRetourComponent, canActivate: [CustomerAuthGuard], canActivateChild: [CustomerAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
