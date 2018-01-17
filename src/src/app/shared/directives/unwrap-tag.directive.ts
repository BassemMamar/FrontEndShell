import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Helpers } from '../../layout/helpers';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appunwraptag]',
})
export class UnwrapTagDirective implements AfterViewInit {


    constructor(private el: ElementRef) {

    }
    ngAfterViewInit() {
        const nativeElement: HTMLElement = this.el.nativeElement;
         Helpers.unwrapTag(nativeElement);
    }

}
