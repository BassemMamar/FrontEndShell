import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth.service';
import { OidcService } from './oidc.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [CallbackComponent],
  providers: [
    AuthService,
    OidcService,
    AuthenticatedGuard,
    AuthGuard
  ]
})
export class AuthModule { }
