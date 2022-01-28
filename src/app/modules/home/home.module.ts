import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './components/example/example.component';
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
import { FormsModule } from '@angular/forms';
import { StepComponent } from './components/register-organization/step/step.component';
import { StepDirective } from './components/register-organization/step.directive';
import { FormComponent } from './components/register-organization/form/form.component';



@NgModule({
  declarations: [
    ExampleComponent,
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
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule
  ]
})
export class HomeModule { }
