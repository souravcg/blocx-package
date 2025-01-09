/* Core import starts */
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ElementRef
} from "@angular/core";
/* Core import ends */

const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "outline-primary",
  "outline-secondary",
  "outline-success",
  "outline-danger"
];

/* Component decorator starts */
@Component({
  selector: "button[blocx-button]",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  encapsulation: ViewEncapsulation.None
})
/* Component decorator ends */

/* Class starts */
export class ButtonComponent implements OnInit {
  @Input() variant: string = "";

  constructor(public _elementRef: ElementRef) {
    // Add a class that applies to all buttons.
    _elementRef.nativeElement.classList.add("blocx-button");
  }

  ngOnInit() {
    // For each of the variant that is present in the button's variant list add the correct corresponding class.
    if (BUTTON_VARIANTS.includes(this.variant)) {
      this._elementRef.nativeElement.classList.add(
        "blocx-button-" + this.variant
      );
    }
  }
}
/* Class ends */
