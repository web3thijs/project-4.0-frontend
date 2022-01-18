import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplePipe } from './pipes/example.pipe';
import { ButtonComponent } from './components/button/button.component';
import { TitleComponent } from './components/title/title.component';
import { ProductViewComponent } from './components/product-view/product-view.component';



@NgModule({
  declarations: [
    ExamplePipe,
    ButtonComponent,
    TitleComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    TitleComponent,
    ProductViewComponent
  ]
})
export class SharedModule { }
