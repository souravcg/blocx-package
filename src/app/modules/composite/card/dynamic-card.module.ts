import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicCardComponent } from './dynamic-card.component';


@NgModule({
  declarations: [DynamicCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicCardComponent   
  ]
})
export class DynamicCardModule { }
