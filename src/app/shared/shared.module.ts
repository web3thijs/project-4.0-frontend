import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplePipe } from './pipes/example.pipe';
import { ExampleComponent } from './components/example/example.component';



@NgModule({
  declarations: [
    ExamplePipe,
    ExampleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
