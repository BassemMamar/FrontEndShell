import { Injectable, ErrorHandler, Inject } from '@angular/core';

import * as StackTrace from 'stacktrace-js';
import { LoggerService } from '../logger/logger.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    // https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
    constructor(
        @Inject(LoggerService) private logger: LoggerService,
        @Inject(LocationStrategy) private location: LocationStrategy
    ) { }

    handleError(error) {
        const message = error.message ? error.message : error.toString();
        const url = this.location instanceof PathLocationStrategy
            ? this.location.path() : '';
        // get the stack trace, lets grab the last 10 stacks only
        StackTrace.fromError(error).then(stackframes => {
            const stack = stackframes[0];
            // const stackString = stackframes
            // .splice(0, 20)
            // .map(function (sf) {
            //     return sf.toString();
            // }).join('\n');
            // log on the server, for now just logging to the console
            this.logger.error('[GlobalErrorHandler]', { message, url, stack });
        });

        // ToDo
        // IMPORTANT: Rethrow the error otherwise it gets swallowed
        //  throw error;
    }
}

export const GlobalErrorHandlerProvider = {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
};
