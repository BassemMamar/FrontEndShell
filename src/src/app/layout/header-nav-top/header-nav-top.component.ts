import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';

declare let mLayout: any;
@Component({
    selector: 'app-header-nav-top',
    templateUrl: './header-nav-top.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavTopComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:no-input-rename
    @Input('current-module-name') currentModule: string;

    constructor() { }
    ngOnInit() {
    }

    ngAfterViewInit() {
        mLayout.initHeader();
    }
}
