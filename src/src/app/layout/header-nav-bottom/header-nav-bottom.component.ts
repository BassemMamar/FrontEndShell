import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

declare let mLayout: any;
@Component({
    selector: 'app-header-nav-bottom',
    templateUrl: './header-nav-bottom.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavBottomComponent implements OnInit, AfterViewInit {


    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        mLayout.initHeader();
    }

}
