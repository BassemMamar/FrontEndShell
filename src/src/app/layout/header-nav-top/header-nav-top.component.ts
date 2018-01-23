import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';

import { ThemeHelperService } from '../theme-helper.service';

@Component({
    selector: 'app-header-nav-top',
    templateUrl: './header-nav-top.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavTopComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:no-input-rename
    @Input('current-module-name') currentModule: string;

    constructor(  private themeHelper: ThemeHelperService) { }
    ngOnInit() {
    }

    ngAfterViewInit() {
      this.themeHelper.mLayout.initHeader();
    }
}
