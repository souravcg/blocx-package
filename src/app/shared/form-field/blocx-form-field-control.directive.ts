import { NgControl } from '@angular/forms';

export abstract class BlocxFormFieldControl<T> {

  /** Gets the NgControl for this control. */
  readonly ngControl: NgControl | null;

  /** The element ID for this control. */
  readonly id: string;

  /** Whether the control is required. */
  readonly required: boolean;

  /** Whether the control is disabled. */
  readonly disabled: boolean;

}
