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
import { DashboardCategoryComponent } from './components/dashboard-category/dashboard-category.component';
import { DashboardCategoryFormComponent } from './components/dashboard-category-form/dashboard-category-form.component';
import { DashboardPagenotfoundComponent } from './components/dashboard-pagenotfound/dashboard-pagenotfound.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOrganizationComponent,
    DashboardProductComponent,
    DashboardCustomerComponent,
    DashboardCategoryComponent,
    DashboardCategoryFormComponent,
    DashboardPagenotfoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
