import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonComponent } from '../modules/basic/button/button.component';
import { ButtonModule } from '../modules/basic/button/button.module';
import { BreadcrumbModule } from '../modules/basic/breadcrumb/breadcrumb.module';
import { BreadcrumbComponent } from '../modules/basic/breadcrumb/breadcrumb.component';
import { CheckboxModule } from '../modules/basic/checkbox/checkbox.module';
import { CheckboxComponent } from '../modules/basic/checkbox/checkbox.component';
import { RadioGroupModule } from '../modules/basic/radio-group/radio-group.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../shared/form-field/form-field.component';
import { FormFieldModule } from '../shared/form-field/form-field.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    BreadcrumbModule,
    CheckboxModule,
    ButtonModule,
    RadioGroupModule,
    FormFieldModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
