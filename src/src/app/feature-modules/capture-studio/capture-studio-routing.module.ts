import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureStudioComponent } from './capture-studio.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthenticatedGuard } from '../../core/auth/guards/authenticated.guard';
import { AuthorizedGuard } from '../../core/auth/guards/authorized.guard';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { FrontendShell } from '../../core/auth/pages-access-authorization/app-pages-declaration/app-pages-declaration';
import { StartJourneyComponent } from './start-journey/start-journey.component';

export function List1Match() {
  return CaseInsensitiveMatcher('List1').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: CaptureStudioComponent,
    // canActivate: [AuthenticatedGuard, AuthorizedGuard],
    // canActivateChild: [AuthenticatedGuard, AuthorizedGuard],
    data: {
      authClient: AuthClients.FES,
      moduleName: FrontendShell.CaptureStudio.Name
    },
    children: [
      { path: 'StartJourney', component: StartJourneyComponent },
      { path: '', pathMatch: 'full', redirectTo: 'StartJourney' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptureStudioRoutingModule { }
