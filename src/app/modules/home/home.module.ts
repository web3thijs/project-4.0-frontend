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



@NgModule({
  declarations: [
    ExampleComponent,
    HomepageComponent,
    ProductComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    OrganizationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule
  ]
})
export class HomeModule { }
