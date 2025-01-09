import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'blocx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbClassExtend!: string;
  @Input() breadcrumbChild!: any[];
  @Input() ariaLabel: any;

  @Output() breadcrumbClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("blocxBreadcrumb") blocxBreadcrumb!: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onBlocxBreadcrumbClick(event:any) {
    this.breadcrumbClick.emit({
      breadcrumbEvent: event,
      breadcrumbElm: this.blocxBreadcrumb.nativeElement
    })
  }

}
