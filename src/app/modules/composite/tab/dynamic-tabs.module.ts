import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTabComponent } from './dynamic-tab.component';
import { DynamicTabsComponent } from './dynamic-tabs.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

@NgModule({
  declarations: [DynamicTabComponent,DynamicTabsComponent,DynamicTabsDirective],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicTabComponent,
    DynamicTabsComponent,
    DynamicTabsDirective
  ]
})
export class DynamicTabsModule { }
