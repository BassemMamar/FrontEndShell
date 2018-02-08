import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
    HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../services/auth.service';

import { LoggerService } from '../../base/logger/logger.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    // https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

    constructor(private authService: AuthService, private logger: LoggerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                const temp = 1;
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
                    /**
                     * ToDo
                     * We have some choices to make at this point.
                     * Do we want to redirect to a specific route that has a login form?
                     * Do we want to show a modal?
                     * Do we want to attempt to refresh the token?
                     */

                }
            }
        });
    }
}

export const ResponseInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
};
