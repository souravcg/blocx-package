import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  /* Aside Nav List */
  navList = [
    { url: '../legacy', label: 'Legacy' },
    // { url: '../composite/toolbox', label: 'About' },
    // { url: '../composite/toolbox', label: 'Phone' },
    // { url: '../composite/toolbox', label: 'Portfolio' },
    // { url: '../composite/toolbox', label: 'Contact' }
  ]

}
