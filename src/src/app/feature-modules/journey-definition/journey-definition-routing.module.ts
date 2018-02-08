import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JourneyDefinitionComponent } from './journey-definition.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthenticatedGuard } from '../../core/auth/guards/authenticated.guard';
import { AuthorizedGuard } from '../../core/auth/guards/authorized.guard';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { FrontendShell } from '../../core/auth/pages-access-authorization/app-pages-declaration/app-pages-declaration';

export function RecentJourneys1Match() {
  return CaseInsensitiveMatcher('RecentJourneys1').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: JourneyDefinitionComponent,
    canActivate: [AuthenticatedGuard, AuthorizedGuard],
    canActivateChild: [AuthenticatedGuard, AuthorizedGuard],
    data: {
      authClient: AuthClients.FES,
      moduleName: FrontendShell.JourneyDefinition.Name
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'RecentJourneys1' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyDefinitionRoutingModule { }
