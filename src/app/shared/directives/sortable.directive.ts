import { Directive, Input, Output, EventEmitter } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': 'asc', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

export const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

@Directive({
  selector: 'th[sortable]',
  host: {
    '(click)': 'rotate()'
  }
})
export class SortableDirective {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}