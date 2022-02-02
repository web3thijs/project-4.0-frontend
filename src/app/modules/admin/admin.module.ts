import { NgModule } from '@angular/core';
import { AdminRoutingModule} from './admin-routing-module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardOrganizationComponent } from './components/dashboard-organization/dashboard-organization.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { DashboardCustomerComponent } from './components/dashboard-customer/dashboard-customer.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOrganizationComponent,
    DashboardProductComponent,
    DashboardCustomerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
