/* Angular Imports */
import { NgModule, Optional, SkipSelf, ClassProvider } from '@angular/core';

/* Base Imports */
import { GlobalErrorHandlerProvider } from './global-error-handler/global-error-handler';
import { CommonService } from './utils/common.service';
import { loggerProvider } from './logger/logger.service';
import { RequestOptionsProvider } from './request-options/default-request-options.service';
import { SelectivePreloadingStrategy } from './lazy-loading/selective-preloading-strategy';
import { throwIfAlreadyLoaded } from './module-import-guard/module-import-guard';
import { TimingInterceptorProvider } from './http-timing-interceptor/timing.interceptor';
import { StorageService } from './storage/storage.service';


@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [],
    providers:
        [
            GlobalErrorHandlerProvider,
            CommonService,
            loggerProvider,
            RequestOptionsProvider,
            SelectivePreloadingStrategy,
            TimingInterceptorProvider,
            StorageService
        ],
})
export class BaseModule {
    constructor( @Optional() @SkipSelf() parentModule: BaseModule) {
        throwIfAlreadyLoaded(parentModule, 'BaseModule');
    }
}
