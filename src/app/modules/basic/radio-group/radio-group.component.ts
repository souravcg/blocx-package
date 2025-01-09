import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true
};

let nextUniqueId = 0;

@Component({
  selector: "blocx-radio-group",
  templateUrl: "./radio-group.component.html",
  styleUrls: ["./radio-group.component.scss"],
  providers: [RADIO_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class RadioGroupComponent implements ControlValueAccessor {
  /** Whether the radio group is required. */
  private _required: boolean = false;

  @Input() items: any;
  @Input() radioGroupClass!: string;
  @Input() radioLabelStyle!: string;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input("aria-label") ariaLabel!: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input("aria-labelledby") ariaLabelledby!: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input("aria-describedby") ariaDescribedby!: string;

  @Output() readonly onRadioModelChange: EventEmitter<any> = new EventEmitter<
    any
  >();
  @Output() readonly onRadioButtonClick: EventEmitter<any> = new EventEmitter<
    any
  >();

  constructor() {}

  ngOnInit() {}

  private _name: string = `blocx-radio-${nextUniqueId++}`;

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  private innerValue!: string | number | boolean;
  get value(): string | number | boolean {
    return this.innerValue;
  }

  set value(v: string | number | boolean) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this._onRadioModelChange(v);
    }
  }

  /** Whether the radio group is required */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  onChange!: Function;
  onTouched!: Function;

  //Control value accessor implementations

  writeValue(value: string | number | boolean) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  _onRadioModelChange(value: string | number | boolean) {
    this.innerValue = value;
    this.onChange(value);
    this.onTouched(value);
    this.onRadioModelChange.emit(value);
  }

  _onInputClick(event:any) {
    event.stopPropagation();
    if(event.keyCode === "38" ) {
      event.stopPropagation();
    }
    this.onRadioButtonClick.emit(event);
  }
}
