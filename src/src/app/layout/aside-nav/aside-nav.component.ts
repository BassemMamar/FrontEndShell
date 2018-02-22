import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { NavMenuItem } from '../model/nav-menu-item';

declare let mLayout: any;
@Component({
    selector: 'app-aside-nav',
    templateUrl: './aside-nav.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    // tslint:disable-next-line:no-input-rename
    @Input('nav-menu-items') navMenuItems: NavMenuItem[];

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        mLayout.initAside();
    }
}
