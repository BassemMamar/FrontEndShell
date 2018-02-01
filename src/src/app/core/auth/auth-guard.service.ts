import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    // canActivate() {
    //     let isLoggedIn = this.authService.isLoggedInObs();
    //     isLoggedIn.subscribe((loggedin) => {
    //         if (!loggedin) {
    //             this.router.navigate(['unauthorized']);
    //         }
    //     });
    //     return isLoggedIn;

    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('In canActivate: ' + state.url);
        return this.checkLoggedIn(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('In canActivateChild: ' + state.url);
        return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
        console.log('In canLoad: ' + route.path);
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean {
        return true;
        // if (this.authService.isLoggedIn()) {
        //     return true;
        // }

        // // Retain the attempted URL for redirection
        // this.authService.redirectUrl = url;
        // this.router.navigate(['/login']);
        // return false;
    }
}
