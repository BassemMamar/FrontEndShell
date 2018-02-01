import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommunicationConfigService } from '../services/communication-config/communication-config.service';
import { OidcService } from './oidc.service';
import { UserRoles, UserProfile } from './model/user-profile';
import { ExceptionService } from '../base/exception/exception.service';
import { LoggerService } from '../base/logger/logger.service';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    // store the URL so we can redirect after logging in
    redirectUrl: string;


    userProfile: UserProfile;

    // Create a stream of logged in status to communicate throughout app
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private router: Router, private communicationConfigService: CommunicationConfigService
        , private oidcService: OidcService, private logger: LoggerService) {
        this.userProfile = this.getUserFromCookie() || new UserProfile();

        // If authenticated, set local profile property and update login status subject
        if (this.userProfile.authClient && this.userProfile.authClient !== '') {
            this.oidcService.createNewOidcUserManagerInstance(this.userProfile.authClient);
            this.setLoggedIn(true);
        } else { this.setLoggedIn(false); }

    }

    private getUserFromCookie(): UserProfile {
        // return null;
        return JSON.parse(localStorage.getItem(this.communicationConfigService.businessCode + 'user'));
    }

    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    async login(authClient: string, redirectUrl: string) {
        try {
            // cfpLoadingBar.start();
            await this.oidcService.login(authClient, redirectUrl);
            // cfpLoadingBar.complete();
            this.logger.log('signinRedirect done');

        } catch (error) {

            // messageHandler.show({
            //     message: 'Login Failed.. ' + err,
            //     messageType: messageHandler.messageTypes.error
            // });
            // cfpLoadingBar.complete();
            this.logger.log(`oidcService login failed: ${error}`);
        }

    }

    logout() {
        // Remove tokens and profile and update login status subject
        // cfpLoadingBar.start();
        return this.oidcService.getCurrentClient()
            .signoutRedirect({ 'id_token_hint': this.userProfile.id_token }).then(resp => {
                this.resetUser();
                this.setLoggedIn(false);
                // cfpLoadingBar.complete();
                this.logger.log(`signed out: ${resp}`);
            }).catch(err => {
                // messageHandler.show({
                //     message: 'logout Failed.. ' + err,
                //     messageType: messageHandler.messageTypes.error
                // });
                // cfpLoadingBar.complete();
                this.logger.log(`signoutRedirect failed: ${err} `);
            });
    }

    private resetUser() {
        localStorage.removeItem(this.communicationConfigService.businessCode + 'user');
        this.userProfile.reset();
    }
    toApplicationUserModelMapper(identityUserModel): Promise<any> {
        // var deferred = $q.defer();

        const identityUserRoles = identityUserModel.profile['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const identityUserEmailAddress = identityUserModel.profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const identityUserName = identityUserModel.profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        const roles = this.getRoles(identityUserRoles);

        const _userProfile = new UserProfile();
        _userProfile.authClient = identityUserModel.state.authClient;
        _userProfile.username = identityUserName;
        _userProfile.email = identityUserEmailAddress;
        _userProfile.id_token = identityUserModel.id_token;
        _userProfile.access_token = identityUserModel.access_token;
        _userProfile.roles = roles;

        this._setSession(_userProfile);
        // deferred.resolve(identityUserModel.state);
        // return deferred.promise;
        return new Promise((resolve, reject) => resolve(identityUserModel.state));
    }

    private getRoles(identityUserRoleObj) {
        const roleResults = [];
        if (Array.isArray(identityUserRoleObj)) {
            identityUserRoleObj.forEach(roleName => {
                const currentRole = UserRoles[roleName.toLowerCase()];
                if (currentRole !== undefined) {
                    roleResults.push(UserRoles[roleName.toLowerCase()]);
                }
            });
        }
        // tslint:disable-next-line:one-line
        else
            if (typeof identityUserRoleObj === 'string') {
                roleResults.push(UserRoles[identityUserRoleObj.toLowerCase()]);
            }
            // tslint:disable-next-line:one-line
            else {
                throw new Error(`There is an issue in roles coming from auth server.. ${identityUserRoleObj}`);
            }

        return roleResults;
    }

    private _setSession(userProfile: UserProfile) {
        localStorage.setItem(this.communicationConfigService.businessCode + 'user', JSON.stringify(userProfile));

        this.userProfile = userProfile;
        this.setLoggedIn(true);
    }


    getCurrentUser() {
        return this.userProfile;
    }

}
