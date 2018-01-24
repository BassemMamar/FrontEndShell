/* Angular Imports */
import { NgModule, Optional, SkipSelf, ClassProvider } from '@angular/core';

/* Base Imports */
import { CommonService } from './utils/common.service';
import { loggerProvider } from './logger/logger.service';
import { ExceptionService } from './exception/exception.service';
import { requestOptionsProvider } from './request-options/default-request-options.service';
import { SelectivePreloadingStrategy } from './lazy-loading/selective-preloading-strategy';
import { throwIfAlreadyLoaded } from './module-import-guard/module-import-guard';
import { TimingInterceptorProvider } from './http-timing-interceptor/timing.interceptor';


@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [],
    providers:
        [
            CommonService,
            loggerProvider,
            ExceptionService,
            requestOptionsProvider,
            SelectivePreloadingStrategy,
            TimingInterceptorProvider,

        ],
})
export class BaseModule {
    constructor( @Optional() @SkipSelf() parentModule: BaseModule) {
        throwIfAlreadyLoaded(parentModule, 'BaseModule');
    }
}
