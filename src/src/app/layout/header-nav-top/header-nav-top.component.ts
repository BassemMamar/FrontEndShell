import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';

import { ThemeHelperService } from '../theme-helper.service';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
    selector: 'app-header-nav-top',
    templateUrl: './header-nav-top.component.html'
})
export class HeaderNavTopComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:no-input-rename
    @Input('current-module-name') currentModule: string;

    constructor(private themeHelper: ThemeHelperService, public authService: AuthService) { }
    ngOnInit() {
    }

    ngAfterViewInit() {
        this.themeHelper.mLayout.initHeader();
    }


    login() {
        const redirectUrl = '/home';
        this.authService.login(AuthClients.FES, redirectUrl);
    }

    logout() {
        this.authService.logout();
    }
}
