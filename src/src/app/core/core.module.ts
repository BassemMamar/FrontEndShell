/* Angular Imports */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlSerializer } from '@angular/router';

/* Core Imports */
import { CoreRoutingModule, CoreRoutedComponents } from './core-routing.module';
import { loggerProvider } from './services/logger/logger.service';
import { ExceptionService } from './services/exception/exception.service';
import { LowerCaseUrlSerializerProvider } from './services/url-serializer/lower-case-url-serializer';
import { requestOptionsProvider } from './services/default-request-options.service';
import { CommunicationConfigService } from './services/communication-config/communication-config.service';
import { SubDomainService } from './services/communication-config/sub-domain.service';
import { SelectivePreloadingStrategy } from './services/lazy-loading/selective-preloading-strategy';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { TimingInterceptorProvider } from './interceptors/timing.interceptor';

@NgModule({
  imports: [
    BrowserModule, // Which import CommonModule internally
    RouterModule,

    /* Core Routings */
    CoreRoutingModule

    /* 3rd Library imports goes here */

  ],
  declarations: [CoreRoutedComponents],
  exports: [],
  providers: [
    CommunicationConfigService,
    SubDomainService,
    loggerProvider,
    TimingInterceptorProvider,
    ExceptionService,
    LowerCaseUrlSerializerProvider,
    requestOptionsProvider,
    SelectivePreloadingStrategy,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    const msg = `${moduleName} has already been loaded. Import Core modules in the AppModule only.`;
    throw new Error(msg);
  }
}
