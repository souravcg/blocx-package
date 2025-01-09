import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectorRef,
  forwardRef,
  Attribute
} from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

/** Change event object emitted by BlocxCheckbox. */
export class BlocxCheckboxChange {
  /** The source BlocxCheckbox of the event. */
  source!: CheckboxComponent;
  /** The new `checked` value of the checkbox. */
  checked!: boolean;
}

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: "blocx-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  tabIndex: number;
  dataList: any = [];

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    @Attribute("tabindex") tabIndex: string) {
    this.tabIndex = parseInt(tabIndex) || 0;
  }

  ngOnInit() {
    if (this.dataList && this.checkboxType == 'nested') {
      for (let i = 0; i < this.dataList.length; i++) {
        this.dataList[i]['class'] = 'parentNode';
      }

      Object.keys(this.dataList).forEach((x) => {
        this.setParent(this.dataList[x], null);
      });

      this.dataList.forEach((x: any) => {
        x.isChecked = false;
      });

      console.log(this.dataList);
    }
  }

  setParent(data: any, parent: any) {
    data.parent = parent;
    data.class = (data.class) ? data.class : "";
    if (data.subnodes) {
      data.subnodes.forEach((x: any) => {
        x.isChecked = false;
        this.setParent(x, data);
      });
    }
  }

  _changeCheckboxEvent(event: Event, checkedData: any) {
    console.log(checkedData);
    this.checkUncheckAllSubnode(checkedData.subnodes, checkedData.isChecked);
    this.checkUncheckParentNode(checkedData, checkedData.isChecked);
  }

  checkUncheckParentNode(checkobj: any, status: boolean) {
    if (!status) {
      if (checkobj.parent) {
        checkobj.isChecked = status;
        checkobj.parent.isChecked = status;
        if (checkobj.parent.parent) {
          this.checkUncheckParentNode(checkobj.parent.parent, status);
        }
      } else {
        checkobj.isChecked = status;
      }
    } else {
      if (checkobj.parent) {
        checkobj.isChecked = status;
        if (checkobj.parent.subnodes) {
          if (checkobj.parent.subnodes.length == checkobj.parent.subnodes.filter((item: any) => { if (item.isChecked) { return item; } }).length) {
            checkobj.parent.isChecked = status;
            if (checkobj.parent.parent) {
              this.checkUncheckParentNode(checkobj.parent.parent, status);
            }
          }
        } else {
          console.log("NoSub: ", checkobj.parent);
        }
      } else {
        checkobj.isChecked = status;
      }
    }
  }

  checkUncheckAllSubnode(checkobj: any, status: boolean) {
    if (checkobj) {
      checkobj.forEach((item: any) => {
        item.isChecked = status;
        if (item.subnodes) {
          this.checkUncheckAllSubnode(item.subnodes, status);
        }
      });
    } else {
      checkobj.isChecked = status;
    }
  }

  checkParentElement(arr: any) {
    arr.forEach((item: any) => {
      if (item.isChecked && item.subnodes.length > 0) {
        if (item.subnodes.filter((nodeobj: any) => { if (nodeobj.isChecked) { return nodeobj; } }).length > 0) {
          this.checkParentElement(item.subnodes);
        }
      }
    });
  }

  /** `aria-label` for the host element */
  @Input("aria-label") ariaLabel: string = "";

  @Input() checkboxType: string | undefined;

  @Input() set list(value: any) {
    this.dataList = value;
  }

  /**Users can specify the `aria-labelledby` attribute which will be forwarded to the input element */
  @Input("aria-labelledby") ariaLabelledby: string | null = null;

  private _uniqueId: string = `blocx-checkbox-${++nextUniqueId}`;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;

  /** Returns the unique id for the visual hidden input. */
  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  /** Name value will be applied to the input element if present */
  @Input() name: string | null = null;

  /** The value attribute of the native input element */
  @Input()
  value!: string;

  /** Whether the checkbox is required. */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required!: boolean;
  /**
   * Whether the checkbox is checked.
   */
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (value != this.checked) {
      this._checked = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _checked: boolean = false;

  /**
   * Whether the checkbox is disabled.
   */
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this.disabled) {
      this._disabled = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _disabled: boolean = false;

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() readonly change: EventEmitter<
    BlocxCheckboxChange
  > = new EventEmitter<BlocxCheckboxChange>();

  _getAriaChecked(): "true" | "false" {
    if (this.checked) {
      return "true";
    }
  }

  _onInputClick(event: Event) {
    //stoping event to prevent bubbling
    event.stopPropagation();
    if (!this.disabled) {
      this.toggle();
      this._emitChangeEvent();
    }
  }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  _onInteractionEvent(event: Event) {
    //stoping event to prevent bubbling
    event.stopPropagation();
  }

  private _emitChangeEvent() {
    const event = new BlocxCheckboxChange();
    event.source = this;
    event.checked = this.checked;
    this.onChange(this.checked);
    this.change.emit(event);
  }

  onChange: any = () => { };
  onTouch: any = () => { };

  //Control value accessor implementations

  writeValue(value: any) {
    this.checked = !!value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
