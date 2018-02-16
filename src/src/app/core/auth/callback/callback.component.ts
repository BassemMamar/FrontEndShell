import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OidcService } from '../services/oidc.service';
import { LoggerService } from '../../base/logger/logger.service';
import { AuthService } from '../services/auth.service';
import { ToasrtService } from '../../../shared/components/toastr/toasrt.service';

@Component({
    template: ''
})

export class CallbackComponent implements OnInit {
    constructor(
        private router: Router,
        private authService: AuthService,
        private logger: LoggerService,
        private toasrtService: ToasrtService) { }

    ngOnInit() {
        this.handleSigninCallback();
    }

    async handleSigninCallback() {
        try {
            const info = await this.authService.loginRedirectCallback();
            this.router.navigate([info.redirectUrl]);
            const username = this.authService.userProfile.username;
            this.toasrtService.success(`Welcome ${username}! `, `Login Success`, { positionClass: 'toast-top-right' });

        } catch (err) {
            this.logger.log('handleSigninCallback err: ', err);
        }

    }
}
