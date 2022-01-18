import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ExampleComponent } from './components/example/example.component';

const routes: Routes = [
  {path: '', component: ExampleComponent},
  {path: 'ddd', component: ExampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
