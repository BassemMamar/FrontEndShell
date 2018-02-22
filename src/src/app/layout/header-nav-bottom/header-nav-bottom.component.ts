import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { NavMenuItem } from '../model/nav-menu-item';


@Component({
    selector: 'app-header-nav-bottom',
    templateUrl: './header-nav-bottom.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavBottomComponent implements OnInit, AfterViewInit {


    // tslint:disable-next-line:no-input-rename
    @Input('nav-menu-items') navMenuItems: NavMenuItem[];

    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
    }

}
