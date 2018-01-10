import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

// https://github.com/dancancro/great-big-example-application/blob/master/src/main/webapp/app/core/services/default-request-options.service.ts
@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

    constructor() {
        super();

        // Set the default 'Content-Type' header
        this.headers.set('Content-Type', 'application/json');
    }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
