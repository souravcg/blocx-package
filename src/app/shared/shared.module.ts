import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe, GreatFilterPipe, searchFilterPipe } from './pipes/filter.pipe';
import { PaginatePipe } from './pipes/paginate.pipe';
import { PaginationControlsDirective } from './directives/pagination-controls.directive';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SortableDirective } from './directives/sortable.directive';

@NgModule({
  declarations: [
    FilterPipe,
    GreatFilterPipe,
    PaginatePipe,
    PaginationControlsDirective,
    TimestampPipe,
    ClickOutsideDirective,
    SortableDirective,
    searchFilterPipe
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    FilterPipe,
    GreatFilterPipe,
    PaginatePipe,
    PaginationControlsDirective,
    TimestampPipe,
    ClickOutsideDirective,
    SortableDirective,
    searchFilterPipe
  ]
})
export class SharedModule { }
