/* Angular Imports */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlSerializer } from '@angular/router';

/* Base Imports */
import { BaseModule } from './base/base.module';
import { throwIfAlreadyLoaded } from './base/module-import-guard/module-import-guard';

/* Core Imports */
import { CoreRoutingModule } from './core-routing.module';
import { CommunicationConfigService } from './services/communication-config/communication-config.service';
import { SubDomainService } from './services/communication-config/sub-domain.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PageLoaderService } from './components/page-loader/page-loader.service';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';

@NgModule({
  imports: [
    BrowserModule, // Which import CommonModule internally
    RouterModule,
    BaseModule,

    /* Core Routings */
    CoreRoutingModule

    /* 3rd Library imports goes here */

  ],
  declarations: [
    PageNotFoundComponent,
    UnauthorizedComponent,
    InternalServerErrorComponent,

    ScrollTopComponent,
    TooltipsComponent,
    PageLoaderComponent
  ],
  exports: [
    BaseModule,

   // PageNotFoundComponent, // ToDo think about it tomorrow
    ScrollTopComponent,
    TooltipsComponent,
    PageLoaderComponent
  ],
  providers: [
    CommunicationConfigService,
    SubDomainService,
    PageLoaderService,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}


