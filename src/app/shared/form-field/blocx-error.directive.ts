import { Directive, Input } from '@angular/core';


let nextUniqueId = 0;

@Directive({
  selector: 'blocx-error',
  host: {
    'class': 'blocx-error',
    'role': 'alert',
    '[attr.id]': 'id',
  }
})
export class BlocxErrorDirective {

  @Input() id: string = `blocx-error-${nextUniqueId++}`;


}
