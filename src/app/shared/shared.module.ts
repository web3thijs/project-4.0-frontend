import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplePipe } from './pipes/example.pipe';
import { ExampleComponent } from './components/example/example.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    ExamplePipe,
    ExampleComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class SharedModule { }
