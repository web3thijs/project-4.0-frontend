import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { HomeRoutingModule } from './home-routing-module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { RegisterOrganizationComponent } from './components/register-organization/register-organization.component';
import { StepComponent } from './components/register-organization/step/step.component';
import { StepDirective } from './components/register-organization/step.directive';
import { FormComponent } from './components/register-organization/form/form.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetourFormComponent } from './components/retour-form/retour-form.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { OrderRetourComponent } from './components/order-retour/order-retour.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';


@NgModule({
  declarations: [
    HomepageComponent,
    ProductComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    OrganizationComponent,
    OrganizationDetailComponent,
    LoginComponent,
    RegisterCustomerComponent,
    RegisterOrganizationComponent,
    StepComponent,
    StepDirective,
    FormComponent,
    FaqComponent,
    ContactComponent,
    RetourFormComponent,
    OrderComponent,
    OrderConfirmationComponent,
    PagenotfoundComponent,
    OrderRetourComponent,
    OrderHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
