import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OidcService } from '../oidc.service';
import { LoggerService } from '../../base/logger/logger.service';
import { AuthService } from '../auth.service';

@Component({
    template: ''
})

export class CallbackComponent implements OnInit {
    constructor(private router: Router, private oidcService: OidcService,
        private authService: AuthService, private logger: LoggerService) { }

    ngOnInit() {
        this.handleSigninCallback();
    }

    async handleSigninCallback() {
        try {
            const identityUserModel = await this.oidcService.signinRedirectCallback();

            this.logger.log(`signin response success: ${identityUserModel}`);

            const info = await this.authService.toApplicationUserModelMapper(identityUserModel);
            this.router.navigate([info.redirectUrl]);

        } catch (err) {
            this.logger.log('handleSigninCallback err: ', err);
        }

    }
}
