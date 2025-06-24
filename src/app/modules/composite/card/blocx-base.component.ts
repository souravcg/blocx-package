import { Input, Directive } from '@angular/core';
import { BlocxButtonColor } from './type';
import { BlocxCardType } from './cardtypes';

@Directive()
export abstract class BlocxBaseComponent {
    @Input() classType: BlocxButtonColor;
    @Input() label: string;
    @Input() id: string;
    @Input() disabled = false;
    @Input() cardType: BlocxCardType;
}