import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestigationComponent } from './investigation-studio.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';
import { RecentJourneysComponent } from './recent-journeys/recent-journeys.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';

export function RecentJourneysMatch() {
  return CaseInsensitiveMatcher('RecentJourneys').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: InvestigationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
