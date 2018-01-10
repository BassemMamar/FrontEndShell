import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule, CoreRoutedComponents } from './core-routing.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { LoggerService, log4tsProvider } from './services/log4ts/logger.service';
import { ExceptionService } from './services/exception.service';
import { LowerCaseUrlSerializerProvider } from './lower-case-url-serializer';
import { requestOptionsProvider } from './services/default-request-options.service';

// imports: imports the module's exports. which is usually declarables and providers
// in our case the spinner has no providers.
//
@NgModule({
  imports: [
    BrowserModule, // Which import CommonModule internally
    FormsModule,
    RouterModule,

    CoreRoutingModule
  ],
  declarations: [CoreRoutedComponents],
  exports: [],
  providers: [
    log4tsProvider,
    ExceptionService,
    LowerCaseUrlSerializerProvider,
    requestOptionsProvider
    // AuthService,
    // AuthGuard
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
