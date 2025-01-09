import {
  Component,
  ContentChild,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { BlocxFormFieldControl } from "./blocx-form-field-control.directive";

let uniqueId = 0;

@Component({
  selector: "blocx-form-field",
  templateUrl: "./form-field.component.html",
  // styleUrls: ["./form-field.component.scss"]
})
export class FormFieldComponent extends BlocxFormFieldControl<any> {
  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  // Unique id for the internal form field label.
  _labelId = `blocx-form-field-label-${uniqueId++}`;

  /** Whether the required marker should be hidden. */
  @Input()
  get hideRequiredMarker(): boolean {
    return this._hideRequiredMarker;
  }
  set hideRequiredMarker(value: boolean) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  private _hideRequiredMarker: boolean = false;

  @ContentChild(BlocxFormFieldControl) contentChild: BlocxFormFieldControl<any>;
  get _control() {
    return this._explicitFormFieldControl;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  private _explicitFormFieldControl: BlocxFormFieldControl<any>;


  ngAfterContentInit() {
    // const control = this._control;
    this._control = this.contentChild;
    // // Run change detection if the value changes.
    // if (control.ngControl && control.ngControl.valueChanges) {
    //   control.ngControl.valueChanges.subscribe(() => this._changeDetectorRef.markForCheck());
    // }
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();
  }
}
