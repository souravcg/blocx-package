import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BlocxLabelDirective } from "./blocx-label.directive";
import { BlocxErrorDirective } from "./blocx-error.directive";
import { FormFieldComponent } from "./form-field.component";

@NgModule({
  declarations: [FormFieldComponent, BlocxLabelDirective, BlocxErrorDirective],
  imports: [CommonModule],
  exports: [FormFieldComponent, BlocxLabelDirective, BlocxErrorDirective]
})
export class FormFieldModule {}
