import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OidcService } from '../services/oidc.service';
import { LoggerService } from '../../base/logger/logger.service';
import { AuthService } from '../services/auth.service';

@Component({
    template: ''
})

export class CallbackComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private logger: LoggerService) { }

    ngOnInit() {
        this.handleSigninCallback();
    }

    async handleSigninCallback() {
        try {
            const info = await this.authService.loginRedirectCallback();
            this.router.navigate([info.redirectUrl]);

        } catch (err) {
            this.logger.log('handleSigninCallback err: ', err);
        }

    }
}
