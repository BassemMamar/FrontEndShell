import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { LoggerService } from '../../base/logger/logger.service';
import { PageLoaderService } from '../../components/page-loader/page-loader.service';

@Injectable()
export class HttpErrorHandlingService {
    // https://angular.io/guide/http#getting-error-details

    constructor(private logger: LoggerService, private pageLoader: PageLoaderService) { }

    handleAsPromise(error: HttpErrorResponse): Promise<any> {
        const meg = this.analyseError(error);
        return new ErrorObservable(meg).toPromise();

    }


    handleAsObservable(error: HttpErrorResponse): ErrorObservable {

        const meg = this.analyseError(error);
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(meg);
    }

    private analyseError(error: HttpErrorResponse): string {
        let userFacingMessage = 'Something bad happened; please try again later.';

        if (error.error instanceof ErrorEvent) {
            /**
             * Something could go wrong on the client-side
             * such as a network error that prevents the request from completing successfully
             * or an exception thrown in an RxJS operator.
             * These errors produce JavaScript ErrorEvent objects.
             */
            this.logger.error('[ErrorHandlingService]', `An client-side or network error occurred: ${error.error.message}`);
        } else {
            /**
             * Something could go wrong on the server-side
             * The server backend reject the request,
             * returning an HTTP response with a status code such as 404 or 500.
             * The response body may contain clues as to what went wrong
             */

            switch (error.status) {
                // connection refused, server not reachable
                case undefined:
                case 0:
                    userFacingMessage = 'Server not reachable';
                    this.logger.error('[ErrorHandlingService]',
                        `Backend returned code (${error.status}), ${userFacingMessage} `);
                    this.pageLoader.setLoading(false);
                    break;

                case 401:
                    userFacingMessage = '...';
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
                    /**
                     * ToDo
                     * We have some choices to make at this point.
                     * Do we want to redirect to a specific route that has a login form?
                     * Do we want to show a modal?
                     * Do we want to attempt to refresh the token?
                     */
                    break;


                default:
                    if (error.message) {
                        this.logger.error('[ErrorHandlingService]',
                            `Backend returned code (${error.status}), ${error.message} `);
                    } else {
                        this.logger.error('[ErrorHandlingService]',
                            `status code is (${error.status}), ${error} `);
                    }

                    this.pageLoader.setLoading(false);

            }
        }

        return userFacingMessage;
    }

}

// // Observable class extensions
// import 'rxjs/add/observable/of';

// // Observable operators
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
