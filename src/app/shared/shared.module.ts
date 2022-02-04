import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplePipe } from './pipes/example.pipe';
import { ButtonComponent } from './components/button/button.component';
import { TitleComponent } from './components/title/title.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { OrganizationViewComponent } from './components/organization-view/organization-view.component';
import { ButtonAddComponent } from './components/button-add/button-add.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExamplePipe,
    ButtonComponent,
    TitleComponent,
    ProductViewComponent,
    OrganizationViewComponent,
    ButtonAddComponent,
    ButtonBackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    TitleComponent,
    ProductViewComponent,
    OrganizationViewComponent,
    ButtonAddComponent,
    ButtonBackComponent
  ]
})
export class SharedModule { }
