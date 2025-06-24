import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuComponent } from './mega-menu.component';
import { RouterModule } from '@angular/router';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
  declarations: [MegaMenuComponent],
  imports: [
    CommonModule,
    NavBarModule,
    RouterModule
  ],
  exports: [
    MegaMenuComponent
  ]
})
export class MegaMenuModule { }
