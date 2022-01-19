import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
