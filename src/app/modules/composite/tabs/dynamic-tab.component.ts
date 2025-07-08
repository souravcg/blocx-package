import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blocx-dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.scss']
})
export class DynamicTabComponent implements OnInit {
  @Input('tabTitle') title!: string;
  @Input('imgTitle') img!:string;
  @Input('tabIcon') icon!: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template:any;
  @Input() dataContext:any;
  
  constructor() { }

  ngOnInit() {
  }

}
