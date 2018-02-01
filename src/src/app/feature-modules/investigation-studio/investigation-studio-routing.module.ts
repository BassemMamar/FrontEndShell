import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestigationComponent } from './investigation-studio.component';
import { RecentJourneysComponent } from './recent-journeys/recent-journeys.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { AuthenticatedGuard } from '../../core/auth/authenticated.guard';

export function RecentJourneysMatch() {
  return CaseInsensitiveMatcher('RecentJourneys').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: InvestigationComponent,
    canActivate: [AuthenticatedGuard],
    canActivateChild: [AuthenticatedGuard],
    data: {
      authClient: AuthClients.FES
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'RecentJourneys' },
      {
        matcher: RecentJourneysMatch,
        //  path: 'recentjourneys',
        component: RecentJourneysComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationStudioRoutingModule { }
