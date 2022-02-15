import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationProductComponent } from './components/organization-product/organization-product.component';
import { HttpClientModule } from '@angular/common/http';
import { OrganizationProductFormComponent } from './components/organization-product-form/organization-product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationOrderComponent } from './components/organization-order/organization-order.component';
import { OrganizationDonationComponent } from './components/organization-donation/organization-donation.component';
import { OrganizationStockFormComponent } from './components/organization-stock-form/organization-stock-form.component';
import { OrganizationAccountComponent } from './components/organization-account/organization-account.component';
import { OrganizationPagenotfoundComponent } from './components/organization-pagenotfound/organization-pagenotfound.component';



@NgModule({
  declarations: [
    OrganizationProductComponent,
    OrganizationProductFormComponent,
    OrganizationComponent,
    OrganizationOrderComponent,
    OrganizationDonationComponent,
    OrganizationStockFormComponent,
    OrganizationAccountComponent,
    OrganizationPagenotfoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ]
})
export class DashboardModule { }
