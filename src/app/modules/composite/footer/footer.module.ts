import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';
import { ListModule } from "../list/list.module";

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [
        CommonModule,
        FormsModule,
        ListModule
    ]
})
export class FooterModule { }
